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
    connections::Dict{AbstractConnection, Channel{Any}}
    condition::Condition
end

function ConnectionPool(
        connections=Dict()
)
    pool = ConnectionPool(
        connections,
        Condition(),
    )
    return pool
end

function addconnection!(pool::ConnectionPool, conn::AbstractConnection)
    if !(conn in keys(pool.connections))
        let outbox = Channel{Any}(Inf)
            pool.connections[conn] = outbox
            @async begin
                while true
                    # Catch errors here, otherwise they are lost to the void.
                    try
                        msg = take!(outbox)
                        if isopen(conn)
                            send(conn, msg)
                        else
                            @info "Connection is not open." conn
                            break
                        end
                    catch exc
                        @error(
                            "An error ocurred in the while processing messages from a ConnectionPool.",
                            exception=exc,
                        )
                        break
                    end
                end
                println("Deleting: $conn")
                delete!(pool.connections, conn)
            end
        end
        notify(pool)
    end
end

function Sockets.send(pool::ConnectionPool, msg)
    ensure_connection(pool)
    for channel in values(pool.connections)
        put!(channel, msg)
    end
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
