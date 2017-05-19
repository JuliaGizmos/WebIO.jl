abstract AbstractConnection

function send(c::AbstractConnection, msg)
    error("No send method for connection of type $(typeof(c))")
end

function logmsg(msg, level="info", data=nothing)
    if level == "error" || level == "warn"
        warn(msg)
    else
        info(msg)
    end

    Dict("type"=>"log", "message"=>msg, "level"=>level, data=>data)
end

function log(c::AbstractConnection, msg, level="info", data=nothing)
    send(c, logmsg(msg, level, data))
end

function dispatch(conn::AbstractConnection, data)
    # first, check if the message is one of the administrative ones
    cmd = data["command"]
    ctxid = data["context"]
    if cmd == "_setup_context"
        if haskey(contexts, ctxid)
            ctx = contexts[ctxid]
            @async while true
                msg = take!(ctx.outbox)
                send(conn, msg)
            end
        else
            log(conn, "Client says it has unknown context $ctxid", "warn")
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
        if !haskey(contexts, ctxid)
            log(conn, "Message $data received for unknown context $ctxid", "warn")
            return
        end
        ctx = contexts[ctxid]
        dispatch(ctx, cmd, data["data"])
    end
end

