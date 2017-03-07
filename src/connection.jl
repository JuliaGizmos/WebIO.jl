abstract AbstractConnection

function send(c::AbstractConnection, msg)
    error("No send method for connection of type $(typeof(c))")
end

function log(c::AbstractConnection, msg, level="info", data=nothing)
    send(c, Dict("type"=>"log", "message"=>msg, "level"=>level, data=>data))
    if level == "error" || level == "warn"
        warn(msg)
    else
        info(msg)
    end
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
        contexts[ctxid]
        dispatch(ctxid, Symbol(cmd), data["data"])
    end
end

