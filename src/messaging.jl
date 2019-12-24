using Sockets
using Distributed: Future

"""
A map from request_id's to pending conditions.
"""
pending_requests = Dict{String, Future}()

"""
    send_request(scope, request[, "key" => "value", ...])

Send a request message for a scope and wait for the response.

Each request has a unique id. This is generated automatically. The client should
(eventually) return a response message with the same id.

**IMPORTANT:** Julia code **CANNOT** synchronously `fetch` (or `wait`, etc.) a
    request that was sent while using IJulia (e.g. Jupyter Notebook/Lab); if you
    exclusively use another provider, it's (probably) fine. The reason for this
    is that the `fetch` makes the current task block, but IJulia will wait for
    the current task to finish before executing the next task. The response will
    be handled in a subsequent task (via a comm message), but since this task
    can never be processed (as the event loop is blocked), this creates a
    deadlock which will freeze the kernel indefinitely.
"""
function send_request(conn, request, data::Pair...)
    request_id = string(UUIDs.uuid1())
    if haskey(pending_requests, request_id)
        error("Cannot register duplicate request id: $(request_id).")
    end
    future = Future()
    pending_requests[request_id] = future
    message = Dict(
      "type" => "request",
      "request" => request,
      "requestId" => request_id,
      data...
    )
    send(conn, message)

    # Run in separate async task to ensure that we delete the pending request
    # future when we get a response (this avoids orphaning responses that we
    # don't actually need).
    return @async begin
        try
            return fetch(future)
        catch exc
            @error "Error fetching request future." exception=exc
            rethrow()
        finally
            delete!(pending_requests, request_id)
        end
    end
end

function Sockets.send(c::AbstractConnection, msg)
    error("No send method for connection of type $(typeof(c))")
end

function logmsg(msg, level="info", data=nothing)
    if level == "error" || level == "warn"
        @warn(msg)
    else
        @info(msg)
    end

    Dict("type"=>"log", "message"=>msg, "level"=>level, data=>data)
end

function log(c::AbstractConnection, msg, level="info", data=nothing)
    send(c, logmsg(msg, level, data))
end

"""
    dispatch(conn, message)

Dispatch a message to WebIO's message handling machinery.

This is typically used by WebIO providers to forward messages from connections
to the appropriate place in Julia.
"""
function dispatch(conn::AbstractConnection, data)
    message_type = get(data, "type", nothing)
    if message_type == "command"
        return handle_command(conn, data)
    elseif message_type == "request"
        return handle_request(conn, data)
    elseif message_type == "response"
        return _handle_response(conn, data)
    end

    msg = "Invalid WebIO message (unknown type)!"
    @error msg conn type=message_type message=data
    error(msg)
end

"""
    handle_command(conn, data)
    handle_command(head::Val{<command name>}, conn, data)

Handle a command message received from a frontend.

This function should not be called by users of WebIO (rather, it's called by
WebIO's internals that deal with passing messages between Julia and the
browser).

A handler for a new command can be created by defining a new method using the
`head::Val{<command type>}` signature above (where `<command type>` should be
a Symbol literal that corresponds to the type of the command).

# Examples
```julia
# Define a handler for a new command named foo.
# This handler is invoked whenever the frontend sends a "foo" command to Julia.
function WebIO.handle_command(::Val{:foo}, conn::AbstractConnection, data)
    @info "Handling the foo command!"
end
```
"""
function handle_command(conn::AbstractConnection, data::Dict)
    command_type = get(data, "command", nothing)
    if command_type === nothing
        msg = "Invalid WebIO command message (missing command field)!"
        @error msg conn command=data
        error(msg)
    end

    return handle_command(Val(Symbol(command_type)), conn, data)
end

# Default handler for when no more specific methods are defined.
function handle_command(::Val{S}, conn, data) where S
    msg = "Unhandled WebIO command message ($(S))!"
    @error msg conn command=data
    error(msg)
end

"""
    handle_request(conn, data)

Handle a request message received from the frontend.

This function should not be called by users of WebIO (rather, it's called by
WebIO's internals that deal with passing messages between Julia and the
browser).

A handler for a new request can be created by defining a new method using the
`head::Val{<request type>}` signature above (where `<request type>` should be
a Symbol literal that corresponds to the type of the request).

# Examples
```julia
# Define a handler for a new request named foo.
# This handler is invoked whenever the frontend sends a "foo" request to Julia.
function WebIO.handle_request(::Val{:foo}, conn::AbstractConnection, data)
    @info "Handling the foo request!"
    return "bar"
end
"""
function handle_request(conn::AbstractConnection, data)
    request_type = get(data, "request", nothing)
    if request_type === nothing
        msg = "Invalid WebIO request message (missing request field)!"
        @error msg conn request=data
        error(msg)
    end
    request_id = get(data, "requestId", nothing)
    if request_id === nothing
        @error("Request message (request=$(repr(request_type))) is missing requestId.")
        return
    end

    try
        payload = handle_request(Val(Symbol(request_type)), conn, data)
        response = Dict(
            "type" => "response",
            "request" => request_type,
            "requestId" => request_id,
            "payload" => payload,
        )
        send(conn, response)
        return nothing
    catch exc
        # We treat exceptions as "normal" in that we just forward the exception
        # to the frontend (and the WebIO JavaScript code raises the error then).
        response = Dict(
            "type" => "response",
            "request" => request_type,
            "requestId" => request_id,
            "exception" => sprint(showerror, exc),
        )
        send(conn, response)
        return nothing
    end
end

# Default handler for when no more specific methods are defined.
function handle_request(head::Val{S}, conn::AbstractConnection, data) where S
    msg = "Unhandled WebIO request message ($(S))!"
    @error msg conn request=data
    error(msg)
end

# This function doesn't use Val-based dispatch because the response body is
# simply put into a future that was created when the associated request was
# sent.
function _handle_response(conn::AbstractConnection, data)
    request_id = get(data, "requestId", nothing)
    if request_id === nothing
        msg = "Invalid WebIO response message (missing response field)!"
        @error msg conn response=data
        error(msg)
    end

    future = get(pending_requests, request_id, nothing)
    if future === nothing
        # This might be because we received a response for a request we never
        # sent **or** because a response was received for a given response twice
        # (and the future was deleted after the first time).
        msg = "Received response message for unknown request."
        @error msg conn request=data
        return
    end

    put!(future, data)
end
