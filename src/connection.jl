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
    request_id = string(rand(UInt64))
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
        result = fetch(future)
        delete!(pending_requests, request_id)
        result
    end
end

function send(c::AbstractConnection, msg)
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

function dispatch(conn::AbstractConnection, data)
    message_type = data["type"]
    if message_type == "request"
        return dispatch_request(conn, data)
    elseif message_type == "response"
        return dispatch_response(conn, data)
    elseif message_type == "command" || haskey(data, "command")
        return dispatch_command(conn, data)
    end
    @error "Unknown WebIO message type: $(message_type)."
end

# function dispatch_command(conn::AbstractConnection, data)
function dispatch_command(conn::AbstractConnection, data)
    # first, check if the message is one of the administrative ones
    cmd = data["command"]
    scopeid = data["scope"]
    if cmd == "setup_scope" || cmd == "_setup_scope"
        if cmd == "_setup_scope"
            @warn("Client used deprecated command: _setup_scope.", maxlog=1)
        end
        if haskey(scopes, scopeid)
            scope = scopes[scopeid]
            addconnection!(scope.pool, conn)
        else
            log(conn, "Client says it has unknown scope $scopeid", "warn")
        end
    elseif cmd == "update_observable"
        if !haskey(data, "name")
            @error "update_observable message missing \"name\" key."
            return
        elseif !haskey(data, "value")
            @error "update_observable message missing \"value\" key."
            return
        elseif !haskey(scopes, scopeid)
            @error "update_observable message received for unknown scope ($scopeid)."
            return
        end
        scope = scopes[scopeid]
        dispatch(scope, data["name"], data["value"])
    else
        @warn "Implicit observable update command is deprecated."
        if !haskey(scopes, scopeid)
            @warn("Message $data received for unknown scope $scopeid")
            return
        end
        scope = scopes[scopeid]
        dispatch(scope, cmd, data["data"])
    end
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
