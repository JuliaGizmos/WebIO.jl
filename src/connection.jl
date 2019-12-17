using Sockets

export AbstractConnection

abstract type AbstractConnection end

"""
    ConnectionPool([outbox[, connections]])

Manages the distribution of messages from the `outbox` channel to a set of
connections. The ConnectionPool asynchronously takes messages from its outbox
and sends each message to every connection in the pool. Any closed connections
are automatically removed from the pool.
"""
struct ConnectionPool
    outbox::Vector
    connections::Set{AbstractConnection}
end

function ConnectionPool(
                        outbox::Channel = Any[],
        connections=Set{AbstractConnection}(),
)
    pool = ConnectionPool(
        outbox,
        connections,
    )

    return pool
end

function addconnection!(pool::ConnectionPool, conn::AbstractConnection)
    push!(pool.connections, conn)
    process_messages(pool)
end

function Sockets.send(pool::ConnectionPool, msg)
    push!(pool.outbox, msg)
    process_messages(pool)
end

"""
    process_messages(pool)

Process messages in a connection pool outbox and send them to all connected
frontends.

This function should be run as a task (it will block forever otherwise).
"""
function process_messages(pool::ConnectionPool)
    while !isempty(pool.outbox) && !isempty(pool.connections)
        msg = pop!(pool.outbox)
        @sync begin
            # This may result in sending to no connections, but we're okay with
            # that because we'll just get the next value of the observable
            # (messages are fire and forget - WebIO makes no guarantees that
            # messages are ever actually delivered).
            for connection in pool.connections
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
        pool::ConnectionPool,
        connection::AbstractConnection,
        msg,
)::Nothing
    try
        if isopen(connection)
            send(connection, msg)
        else
            @info "Connection is not open." connection
            delete!(pool.connections, connection)
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
