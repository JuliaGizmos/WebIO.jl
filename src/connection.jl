"""
A map from request_id's to pending conditions.
"""
pending_requests = Dict{String, Channel}()

function await_response(request_id::String)
    @info "await_response"
    if haskey(pending_requests, request_id)
        error("Cannot register duplicate request id: $(request_id).")
    end
    channel = Channel(1)
    pending_requests[request_id] = channel
    @warn "await_request returning channel instead of response (fix me! --travis)"
    return channel
    @info "await_response: waiting for response..."
    result = fetch(channel)
    @info "await_response: got response"
    delete!(pending_requests, request_id)
    return result
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
    @info "dispatch"
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
    @info "dispatch_command"
    # first, check if the message is one of the administrative ones
    cmd = data["command"]
    scopeid = data["scope"]
    if cmd == "setup_scope"
        if haskey(scopes, scopeid)
            scope = scopes[scopeid]
            addconnection!(scope.pool, conn)
        else
            log(conn, "Client says it has unknown scope $scopeid", "warn")
        end
    elseif cmd == "update_observable"
        # log(conn, "update_observable!")
        @info "update_observable!"
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
            # log(conn, "Message $data received for unknown scope $scopeid", "warn")
            @warn "oops"
            return
        end
        scope = scopes[scopeid]
        dispatch(scope, cmd, data["data"])
    end
end

function dispatch_request(conn::AbstractConnection, data)
    @error "Not implemented."
end

function dispatch_response(conn::AbstractConnection, data)
    @info "dispatch_response"
    request_id = get(data, "requestId", nothing)
    if request_id === nothing
        @error "Response message is missing `requestId` key."
        return
    end

    channel = get(pending_requests, request_id, nothing)
    if channel === nothing
        @error "Received response message for unknown request: $(request_id)."
        return
    end

    @info "Resolving request: $(request_id)."
    put!(channel, data)
end
