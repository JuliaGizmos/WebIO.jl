using Sockets

export AbstractConnection

abstract type AbstractConnection end

"""
The maximum number of messages to allow into the outbox.
"""
const DEFAULT_OUTBOX_LIMIT = 32

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
    condition::Condition
end

function ConnectionPool(
        outbox::Channel = Channel{Any}(DEFAULT_OUTBOX_LIMIT),
        connections=Set{AbstractConnection}(),
)
    pool = ConnectionPool(
        outbox,
        connections,
        Condition(),
    )

    # Catch errors here, otherwise they are lost to the void.
    @async try
        process_messages(pool)
    catch exc
        @error(
            "An error ocurred in the while processing messages from a "
                * "ConnectionPool.",
            exception=exc,
        )
    end

    return pool
end

function addconnection!(pool::ConnectionPool, conn::AbstractConnection)
    push!(pool.connections, conn)
    notify(pool)
end

function Sockets.send(pool::ConnectionPool, msg)
    if length(pool.outbox.data) >= pool.outbox.sz_max
        # TODO: https://github.com/JuliaGizmos/WebIO.jl/issues/343
        return
    end
    put!(pool.outbox, msg)
end

"""
    ensure_connection(pool)

Ensure that the pool has at least one connection, potentially blocking the
current task until that is the case. Also processes incoming connections.
"""
function ensure_connection(pool::ConnectionPool)
    if isempty(pool.connections)
        wait(pool.condition)
    end
end

Base.wait(pool::ConnectionPool) = ensure_connection(pool)
Base.notify(pool::ConnectionPool) = notify(pool.condition)

"""
    process_messages(pool)

Process messages in a connection pool outbox and send them to all connected
frontends.

This function should be run as a task (it will block forever otherwise).
"""
function process_messages(pool::ConnectionPool)
    ensure_connection(pool)
    while true
        msg = take!(pool.outbox)
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
