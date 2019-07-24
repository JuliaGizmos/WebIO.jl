using Sockets

export AbstractConnection

abstract type AbstractConnection end

"""
The number of connections that we allow to be in a "pending" state (_i.e._ that
haven't been moved from a `ConnectionPool`'s `new_connections` set to its
`connections` set).
"""
const PENDING_CONNECTION_LIMIT = 32

"""
    ConnectionPool([outbox[, connections]])

Manages the distribution of messages from the `outbox` channel to a set of
connections. The ConnectionPool asynchronously takes messages from its outbox
and sends each message to every connection in the pool. Any closed connections
are automatically removed from the pool.
"""
struct ConnectionPool
    outbox::Channel
    connections::Set{AbstractConnection}
    new_connections::Channel{AbstractConnection}
end

function ConnectionPool(
        outbox::Channel = Channel{Any}(Inf),
        connections=Set{AbstractConnection}(),
)
    pool = ConnectionPool(
        outbox,
        connections,
        Channel{AbstractConnection}(PENDING_CONNECTION_LIMIT),
    )
    @async process_messages(pool)
    return pool
end

function addconnection!(pool::ConnectionPool, c::AbstractConnection)
    put!(pool.new_connections, c)
end

function Sockets.send(pool::ConnectionPool, msg)
    put!(pool.outbox, msg)
end

"""
    ensure_connection(pool)

Ensure that the pool has at least one connection, potentially blocking the
current task until that is the case. Also processes incoming connections.
"""
function ensure_connection(pool::ConnectionPool)
    if isempty(pool.connections)
        wait(pool.new_connections)
    end
    while isready(pool.new_connections)
        push!(pool.connections, take!(pool.new_connections))
    end
end

Base.wait(pool::ConnectionPool) = ensure_connection(pool)

"""
    process_messages(pool)

Process messages in a connection pool outbox and send them to all connected
frontends.

This function should be run as a task (it will block forever otherwise).
"""
function process_messages(pool::ConnectionPool)
    while true
        ensure_connection(pool)
        msg = take!(pool.outbox)
        @sync begin
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
)::Bool
    try
        if isopen(connection)
            send(connection, msg)
            return true
        else
            delete!(pool.connections, connection)
            return false
        end
    catch ex
        @error(
            "An exception occurred while trying to send a WebIO message to a "
                * "frontend:",
            exception=ex,
        )
        delete!(pool.connections, connection)
        rethrow()
    end
end
