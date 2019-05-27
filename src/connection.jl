using Sockets

export AbstractConnection

abstract type AbstractConnection end

"""
    ConnectionPool(outbox::Channel, connections::Set{AbstractConnection}=Set())

Manages the distribution of messages from the `outbox` channel to a set of
connections. The ConnectionPool asynchronously takes messages from its outbox
and sends each message to every connection in the pool. Any closed connections
are automatically removed from the pool.
"""
struct ConnectionPool
    outbox::Channel
    connections::Set{AbstractConnection}
    new_connections::Channel{AbstractConnection}

    function ConnectionPool(outbox::Channel, connections=Set{AbstractConnection}())
        new_connections = Channel{AbstractConnection}(32)
        pool = new(outbox, connections, new_connections)
        @async process_messages(pool)
        pool
    end
end

addconnection!(pool::ConnectionPool, c::AbstractConnection) = put!(pool.new_connections, c)
Sockets.send(pool::ConnectionPool, msg) = put!(pool.outbox, msg)

"""
    ensure_connection(pool::ConnectionPool)

Ensure that the pool has at least one connection, potentially blocking
the current task until that is the case.
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

function process_messages(pool::ConnectionPool)
    while true
        msg = fetch(pool.outbox)  # don't take! yet, since we're not sure msg can be sent
        ensure_connection(pool)
        msg_sent = false
        @sync begin
            for connection in pool.connections
                @async begin
                    if isopen(connection)
                        send(connection, msg)
                        msg_sent = true
                    else
                        delete!(pool.connections, connection)
                    end
                end
            end
        end
        if msg_sent
            # Message was sent, so remove it from the channel
            take!(pool.outbox)
        end
    end
end
