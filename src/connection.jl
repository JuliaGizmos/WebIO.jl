using Sockets

export AbstractConnection

abstract type AbstractConnection end

function sendall(pool::Set, msg)
    process_messages(pool, msg)
end

"""
    process_messages(pool)

Process messages in a connection pool outbox and send them to all connected
frontends.

This function should be run as a task (it will block forever otherwise).
"""
function process_messages(pool::Set, msg)
    if !isempty(pool)
        @sync begin
            # This may result in sending to no connections, but we're okay with
            # that because we'll just get the next value of the observable
            # (messages are fire and forget - WebIO makes no guarantees that
            # messages are ever actually delivered).
            for connection in pool
                @async send_message(pool, connection, msg)
            end
        end
    end
end

"""
    send_message(pool, connection, msg)

Send a message to an individual connection within a pool, handling errors and
deleting the connection from the pool if necessary.
"""
function send_message(
        pool::Set,
        connection::AbstractConnection,
        msg,
)::Nothing
    try
        if isopen(connection)
            send(connection, msg)
        else
            @info "Connection is not open." connection
            delete!(pool, connection)
        end
    catch ex
        @error(
            "An exception occurred while trying to send a WebIO message to a "
                * "frontend:",
            exception=ex,
        )
        delete!(pool.connections, connection)
    finally
        return nothing
    end
end
