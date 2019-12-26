using Sockets
using Distributed: Future

export AbstractConnection

abstract type AbstractConnection end

"""
    command(ctx, command_type, payload)
    command(ctx, command_type, "key" => "value", ...)

Send a command message to a frontend(s).
"""
function command(ctx, command_type, payload)
    data = Dict(
        "type" => "command",
        "command" => command_type,
        "payload" => payload,
    )
    send(ctx, data)
    return nothing
end

function command(ctx, command_type, payload::Pair...)
    return command(ctx, command_type, Dict(payload...))
end

"""
A map from request_id's to pending conditions.
"""
const pending_requests = Dict{String, Future}()

"""
    request(ctx, request_type, payload)
    request(ctx, request_type, "key" => "value", ...)

Send a request message and return a `Task` whose result value is the response
from the frontend.

Each request has a unique id. This is generated automatically.
The frontend should (eventually) return a response message with the same id.

**IMPORTANT:**
    Julia code **CANNOT** synchronously `fetch` (or `wait`, etc.) a
    request that was sent while using IJulia (e.g. Jupyter Notebook/Lab); if you
    exclusively use another provider, it's (probably) fine. The reason for this
    is that the `fetch` makes the current task block, but IJulia will wait for
    the current task to finish before executing the next task. The response will
    be handled in a subsequent task (via a comm message), but since this task
    can never be processed (as the event loop is blocked), this creates a
    deadlock which will freeze the kernel indefinitely.
"""
function request end
function request(
        ctx,
        request_type,
        payload,
        ;
        request_id::String = string(UUIDs.uuid1()),
)
    if haskey(pending_requests, request_id)
        error("Duplicate request id ($(request_id)).")
    end

    data = Dict(
        "type" => "request",
        "request" => request_type,
        "requestId" => request_id,
        "payload" => payload,
    )

    future = Future()
    pending_requests[request_id] = future
    send(ctx, message)

    # Use an async task so that we can make sure to always delete the future
    # once we get a response (even if the user doesn't `wait` it).
    return @async begin
        try
            return fetch(future)
        catch exc
            # Add a logging statement here so that the error doesn't get lost
            # to the void if no one ever `wait`s the task.
            @error "Error fetching request future." exception=exc
            rethrow()
        finally
            delete!(pending_requests, request_id)
        end
    end
end

# Convenience syntax
function request(ctx, request_type, data::Pair...)
    return request(ctx, request_type, Dict(data...))
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

    payload = data["payload"]
    return handle_command(Val(Symbol(command_type)), conn, payload)
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

    request_payload = data["payload"]
    response = try
        response_payload = handle_request(
            Val(Symbol(request_type)),
            conn,
            request_payload,
        )
        Dict(
            "type" => "response",
            "request" => request_type,
            "requestId" => request_id,
            "payload" => response_payload,
        )
    catch exc
        # We treat exceptions as "normal" in that we just forward the exception
        # to the frontend (and the WebIO JavaScript code raises the error then).
         Dict(
            "type" => "response",
            "request" => request_type,
            "requestId" => request_id,
            "exception" => sprint(showerror, exc),
        )
    end

    send(conn, response)
    return nothing
end

# Default handler for when no more specific methods are defined.
function handle_request(head::Val{S}, conn::AbstractConnection, data) where S
    msg = "Unhandled WebIO request message ($(S))!"
    @error msg conn request=data
    error(msg)
end

# This function doesn't use Val-based dispatch because the response body is
# simply put into a future that was created when the associated request was
# sent (i.e., we don't let users "handle" responses, they just get the response
# value returned when they await the request task).
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

    put!(future, data["payload"])
end
