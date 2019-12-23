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

# TODO:
#   rename to handle_message to get away from the overloaded usage of "dispatch"
#   in the codebase
function dispatch(conn::AbstractConnection, data)
    message_type = data["type"]
    if message_type == "request"
        return dispatch_request(conn, data)
    elseif message_type == "response"
        return dispatch_response(conn, data)
    elseif message_type == "command"
        return handle_command(conn, data)
    end
    @error "Unknown WebIO message type: $(message_type)."
end

"""
    handle_command(conn, data)
    handle_command(head::Val{<command name>}, conn, data)

Handle a command message received by WebIO.

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
        @error msg conn data
        error(msg)
    end

    return handle_command(Val(Symbol(command_type)), conn, data)
end

# Default handler for when no more specific methods are defined.
function handle_command(::Val{S}, conn, data) where S
    msg = "Unhandled WebIO command message ($(S))!"
    @error msg conn data
    error(msg)
end


ResponseDict = Dict{String, Any}
request_handlers = Dict{String, Function}()
function register_request_handler(request_type::String, handler::Function)
    if haskey(request_handlers, request_type)
        error("Duplicate request type: $(request_type).")
    end
    request_handlers[request_type] = handler
end

function dispatch_request(conn::AbstractConnection, data)
    request_id = get(data, "requestId", nothing)
    request_type = get(data, "request", nothing)
    if request_id === nothing
        @error("Request message (request=$(repr(request_type))) is missing requestId.")
        return
    end
    try
        handler = get(request_handlers, request_type, nothing)
        if handler === nothing
            error("Unknown request type (request=$(repr(request_type))).")
        end
        # Julia sometimes narrows the type of the returned dict
        # (for example, the handler might return Dict{String, Int64}).
        response = convert(ResponseDict, handler(data))
        response["type"] = "response"
        response["request"] = request_type
        response["requestId"] = request_id
        send(conn, response)
        return
    catch (e)
        send(conn, Dict(
            "type" => "response",
            "request" => get(data, "request", nothing),
            "requestId" => request_id,
            "error" => sprint(showerror, e),
        ))
        return
    end
end

function dispatch_response(conn::AbstractConnection, data)
    request_id = get(data, "requestId", nothing)
    if request_id === nothing
        @error "Response message is missing `requestId` key."
        return
    end

    future = get(pending_requests, request_id, nothing)
    if future === nothing
        @error "Received response message for unknown requestId: $(request_id)."
        return
    end
    put!(future, data)
end
