export Observable, obsid

function Observable{T}(scope::Scope, value; kwargs...) where {T}
    observable = Observable{T}(value)
    add_observable!(scope, observable; kwargs...)
end

function Observable(scope::Scope, value::T; kwargs...) where {T}
    return Observable{T}(scope, value; kwargs...)
end

function Observable{T}(
    scope::Scope,
    alias::String,
    value::T,
    ;
    kwargs...
) where {T}
    return Observable{T}(scope, value; alias=alias, kwargs...)
end

function Observable(
    scope::Scope,
    alias::String,
    value::T,
    ;
    kwargs...
) where {T}
    return Observable{T}(scope, alias, value; kwargs...)
end

function add_observable!(
        scope::Scope,
        observable::AbstractObservable,
        ;
        alias::Union{String, Nothing}=nothing,
        overwrite=false,
        private=false,
        js_handlers=AbstractString[],
)
    key = obsid(observable)
    if haskey(scope.observables, key) && !overwrite
        error("Duplicate observable: $(repr(observable)).")
    end

    scope.observables[key] = ScopeObservableInfo(
        observable,
        private=private,
        js_handlers=js_handlers,
    )

    if alias !== nothing
        scope.observable_aliases[alias] = observable
    end

    return observable
end

function Base.getindex(scope::Scope, alias::String)
    return scope.observable_aliases[alias]
end

function Base.setindex!(
        scope::Scope,
        observable::AbstractObservable,
        alias::String,
)
    return addobservable!(scope, observable, alias=alias)
end

"""
    SyncCallback(observable::Observable, scopes::Set{Scope})

A callback that is registered with the given `Observable` that is used to update
the WebIO frontend(s).
"""
struct SyncCallback
    observable::AbstractObservable
    scopes::Set{WeakRef}
end

function connections(sync_callback::SyncCallback)
    connection_set = Set{AbstractConnection}()
    for scope in connection_set
        union!(connection_set, connections(scope))
    end
    return connection_set
end

function (sync_callback::SyncCallback)(value)
    for connection in connections(sync_callback)
        if !isopen(connection)
            continue
        end
        _send_update_observable(connection, sync_callback.observable, value)
    end
    return nothing
end

"""
    ensure_sync!(observable::AbstractObservable)

Ensure that an observable has a `SyncCallback` associated with it. This ensures
that updates to the `Observable` are handled by WebIO.
"""
function ensure_sync!(
    connection::AbstractConnection,
    observable::AbstractObservable,
)
    # Check if we already have a SyncCallback setup for the connection and
    # observable pair.
    has_sync_callback = any(listeners(observable)) do callback
        return calback isa SyncCallback && callback.connection === connection
    end
    if has_sync_callback
        return
    end

    # We don't have a SyncCallback setup, so add a listener.
    on(SyncCallback(scope, observable), observable)
end

"""
Set observable without synchronizing with the counterpart on the browser
"""
function set_nosync!(observable::AbstractObservable, val)
    Observables.setexcludinghandlers(
        observable,
        val,
        x -> !(x isa SyncCallback),
    )
end

"""
Send a command to update the frontend's value for an observable.
"""
function _send_update_observable(
    conn::AbstractConnection,
    name::AbstractString,
    value,
)
    return command(conn, "update_observable", "name" => name, "value" => value)
end
