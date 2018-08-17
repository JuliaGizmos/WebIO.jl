
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
    # first, check if the message is one of the administrative ones
    cmd = data["command"]
    scopeid = data["scope"]
    if cmd == "_setup_scope"
        if haskey(scopes, scopeid)
            scope = scopes[scopeid]
            addconnection!(scope.pool, conn)
        else
            log(conn, "Client says it has unknown scope $scopeid", "warn")
        end
    elseif cmd == "_acknowledge_message"
        msgid = data["messageId"]
        if haskey(waiting_messages, msgid)
            notify(waiting_messages[msgid])
            delete!(waiting_messages, msgid)
        else
            log(conn,
                "Acknowledgement received for message" *
                "$msgid but not waiting for it",
                "warn")
        end
    else
        if !haskey(scopes, scopeid)
            log(conn, "Message $data received for unknown scope $scopeid", "warn")
            return
        end
        scope = scopes[scopeid]
        dispatch(scope, cmd, data["data"])
    end
end

