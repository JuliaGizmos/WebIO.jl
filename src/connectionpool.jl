using Sockets

"""
    ConnectionPool([connections::Set{AbstractConnection}])

A set of connections that manages messaging between Julia and (potentially)
multiple frontends.
"""
struct ConnectionPool
    connections::Set{AbstractConnection}
    _new_connnection_condition::Condition

    function ConnectionPool(connections::Set{AbstractConnection})
        return new(connections, Condition())
    end
end

ConnectionPool() = ConnectionPool(Set{AbstractConnection}())

function Base.show(io::IO, pool::ConnectionPool)
    show(io, typeof(pool))
    print(io, "($(length(pool.connections)) connections)")
end

"""
    ensure_connection(pool)

Ensure that the pool has at least one connection, potentially blocking the
current task until that is the case. Also processes incoming connections.
"""
function ensure_connection(pool::ConnectionPool)
    if isempty(pool.connections)
        @debug "Waiting for connections..." pool
        wait(pool._new_connection_condition)
        @debug "Finished waiting for connections." pool
    end
    return nothing
end

function add_connection!(pool::ConnectionPool, conn::AbstractConnection)
    push!(pool.connections, conn)
    notify(pool._new_connnection_condition)
    @debug "Added connection to pool." pool conn
end

function remove_connection!(pool::ConnectionPool, conn::AbstractConnection)
    delete!(pool, conn)
end

Base.wait(pool::ConnectionPool) = ensure_connection(pool)
connections(pool::ConnectionPool) = pool.connections

function Sockets.send(pool::ConnectionPool, msg; ensure=false)
    if ensure
        ensure_connection(pool)
    end

    did_send = false
    # Avoid @sync/@async overhead if we only have zero or one connection to send
    # to.
    if length(pool.connections) <= 1
        for connection in pool.connections
            did_send = _send_message(pool, connection, msg)
        end

        # Handle the case where we failed to send because the connection went
        # away and we are ensuring delivery.
        if !did_send && ensure
            @assert length(pool.connections) == 0
            return send(pool, msg; ensure=true)
        end

        return nothing
    end

    @sync begin
        for connection in pool.connections
            @async if _send_message(pool, connection, msg)
                # Not a race condition because we only ever update it to one
                # value (no stale-read problem).
                did_send = true
            end
        end
    end

    if !did_send && ensure
        @debug(
            "Failed sending to all connections, waiting for new connections.",
            pool, msg,
        )
        @assert length(pool.connections) == 0
        return send(pool, msg; ensure=true)
    end

    return nothing
end

"""
    _send_message(pool, connection, msg)::Bool

Send a message to an individual connection within a pool, handling errors and
deleting the connection from the pool if necessary.

Returns `true` if the message was succesfully sent and `false` otherwise.
"""
function _send_message(
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
        end
    catch ex
        @error(
            "An exception occurred while trying to send a WebIO message to a "
                * "frontend:",
            exception=ex,
        )
        delete!(pool.connections, connection)
    end
    return false
end

function request(pool::ConnectionPool, request_type, payload; kwargs...)
    # TODO: Maybe support an `eachconnection` type thing?
    error("Sending requests to ConnectionPools is not supported.")
end
