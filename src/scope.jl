using JSON
using WebIO: AbstractConnection

export Scope,
       AbstractConnection,
       withscope,
       Observable,
       @private,
       setobservable!,
       on, onjs,
       evaljs,
       onmount,
       onimport,
       ondependencies,
       adddeps!,
       import!,
       addconnection!

import Compat.Sockets: send
import Observables: Observable, AbstractObservable, listeners

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
send(pool::ConnectionPool, msg) = put!(pool.outbox, msg)

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


"""
    Scope(id; kwargs...)

An object which can send and receive messages.

Fields:
- `id::String`: A unique ID
- `imports`: An array of js/html/css assets to load
  before rendering the contents of a scope.
"""
mutable struct Scope
    id::AbstractString
    dom::Any
    observs::Dict{String, Tuple{AbstractObservable, Union{Nothing,Bool}}} # bool marks if it is synced
    private_obs::Set{String}
    systemjs_options
    imports::AbstractArray
    # A collection of handler functions associated with various observables in
    # this scope. Of the form
    # "observable-name" => ["array", "of", "JS", "strings"]
    # where each JS-string is a function that is invoked when the observable
    # changes.
    jshandlers
    pool::ConnectionPool

    mount_callbacks::Vector{JSString}
end

const scopes = Dict{String, Scope}()

function Scope(id::String=newid("scope");
        dom=dom"span"(),
        outbox::Channel=Channel{Any}(Inf),
        observs::Dict=Dict(),
        private_obs::Set{String}=Set{String}(),
        dependencies=nothing,
        systemjs_options=nothing,
        imports=nothing,
        jshandlers::Dict=Dict(),
        mount_callbacks::Vector{JSString}=Vector{JSString}(),
    )

    if dependencies !== nothing
        @warn("dependencies keyword argument is deprecated, use WebAsset instead.", maxlog=1)
        imports = dependencies
    end

    if imports !== nothing
        imports = map(Asset, imports)
    end

    if imports === nothing
        imports = []
    end

    if haskey(scopes, id)
        @warn("A scope by the id $id already exists. Overwriting.")
    end

    pool = ConnectionPool(outbox)

    scopes[id] = Scope(id, dom, observs, private_obs, systemjs_options, imports, jshandlers, pool, mount_callbacks)
end
Base.@deprecate Scope(id::AbstractString; kwargs...) Scope(; id=id, kwargs...)

(w::Scope)(arg) = (w.dom = arg; w)
Base.wait(scope::Scope) = ensure_connection(scope.pool)

function Observables.on(f, w::Scope, key)
    key = string(key)
    listener, _ = Base.@get! w.observs key (Observable{Any}(w, key, nothing), nothing)
    on(f, listener)
end

private(scope::Scope, props...) = foreach(p->push!(scope.private_obs, string(p)), props)

macro private(ex)
    if ex.head == :(=)
        ref, val = ex.args
        scope, key = ref.args
        quote
            x=$(esc(ex))
            private($(esc(scope)), $(esc(key)))
            x
        end
    else
        error("Wrong usage of @private. Use as in `@private scope[\"key\"] = observable`")
    end
end

# we need to maintain mapping from an ID to observable
# in order to allow interpolation of observables.
const observ_id_dict = WeakKeyDict()

function setobservable!(ctx, key, obs; sync=nothing)
    key = string(key)
    if haskey(ctx.observs, key)
        @warn("An observable named $key already exists in scope $(ctx.id).
             Overwriting.")
    end

    ctx.observs[key] = (obs, sync)

    # the following metadata is stored for use in interpolation
    # of observables into DOM trees and `@js` expressions
    observ_id_dict[obs]  = (WeakRef(ctx), key)
    obs
end

# Ask JS to send stuff
function setup_comm(f, ob::AbstractObservable)
    if haskey(observ_id_dict, ob)
        scope, key = observ_id_dict[ob]
        # if !(key in scope.value.private_obs)
        #     evaljs(scope.value, js"""
        #            console.log(this)
        #            this.observables[$key].sync = true
        #     """)
        # end
    end
end

# TODO: hook `off` up

function Base.getindex(w::Scope, key)
    key = string(key)
    if haskey(w.observs, key)
        w.observs[key][1]
    else
        Observable{Any}(w, key, nothing)
    end
end

function Base.setindex!(w::Scope, obs, key)
    setobservable!(w, key, obs)
end

function Observable{T}(ctx::Scope, key, value; sync=nothing) where {T}
    setobservable!(ctx, key, Observable{T}(value), sync=sync)
end

function Observable(ctx::Scope, key, val::T; sync=nothing) where {T}
    Observable{T}(ctx, key, val; sync=sync)
end

const Observ = Observable

include("imports.jl")

function JSON.lower(x::Scope)
    obs_dict = Dict()
    for (k, ob_) in x.observs
        ob, sync = ob_
        if k in x.private_obs
            continue
        end
        if sync === nothing
            # by default, we sync if there are any listeners
            # other than the JS back edge
            sync = any(f-> !isa(f, SyncCallback), listeners(ob))
        end
        obs_dict[k] = Dict("sync" => sync,
             "value" => ob[],
             "id" => obsid(ob))
    end
    Dict(
        "id" => x.id,
        "systemjs_options" => x.systemjs_options,
        "imports" => lowerassets(x.imports),
        "handlers" => x.jshandlers,
        "mount_callbacks" => x.mount_callbacks,
        "observables" => obs_dict)
end

function render(s::Scope)
    node(s, s.dom)
end

"""
    send_command(scope, command[, "key" => "value", ...])

Send a command message for a scope. A command is essentially a fire-and-forget
style message; no response or acknowledgement is expected.
"""
function send_command(scope::Scope, command, data::Pair...)
    message = Dict(
      "type" => "command",
      "command" => command,
      "scope" => scope.id,
      data...
    )
    send(scope.pool, message)
    nothing
end

"""
Send a command to update the frontend's value for an observable.
"""
send_update_observable(scope::Scope, name::AbstractString, value) = send_command(
    scope,
    "update_observable",
    "name" => name,
    "value" => value,
)

send_request(scope::Scope, request, data::Pair...) = send_request(scope.pool, request, "scope" => scope.id, data...)

macro evaljs(ctx, expr)
    @warn("@evaljs is deprecated, use evaljs function instead")
    :(send_request($(esc(ctx)), "eval", "expression" => $(esc(expr))))
end

function evaljs(ctx, expr)
    send_request(ctx, "eval", "expression" => expr)
end

function onmount(scope::Scope, f::JSString)
    push!(scope.mount_callbacks, f)
    return scope
end

function onimport(scope::Scope, f::JSString)
    onmount(scope, js"""
        function () {
            var handler = ($(f));
            ($(Async(scope.imports))).then((imports) => handler.apply(this, imports));
        }
        """)
end

onmount(scope::Scope, f) = onmount(scope, JSString(f))
onimport(scope::Scope, f) = onimport(scope, JSString(f))

Base.@deprecate ondependencies(ctx, jsf) onimport(ctx, jsf)

"""
A callable which updates the frontend
"""
struct SyncCallback
    ctx
    f
end

(s::SyncCallback)(xs...) = s.f(xs...)
"""
Set observable without synchronizing with the counterpart on the browser
"""
function set_nosync(ob, val)
    Observables.setexcludinghandlers(ob, val, x -> !(x isa SyncCallback))
end

const lifecycle_commands = ["scope_created"]
function dispatch(ctx, key, data)
    if haskey(ctx.observs, string(key))
        # this message has come from the browser
        # so don't update the browser back!
        set_nosync(ctx.observs[key][1], data)
    else
        key ∈ lifecycle_commands ||
            @warn("$key does not have a handler for scope id $(ctx.id)")
    end
end

function onjs(ctx, key, f)
    push!(Base.@get!(ctx.jshandlers, key, []), f)
end

function offjs(ctx, key, f)
    if f in get(ctx.jshandlers, key, [])
        keys = ctx.jshandlers[key]
        deleteat!(keys, findall(in(f), keys))
    end
    nothing
end

function ensure_sync(ctx, key)
    ob = ctx.observs[key][1]
    # have at most one synchronizing handler per observable
    if !any(x->isa(x, SyncCallback) && x.ctx==ctx, listeners(ob))
        f = SyncCallback(ctx, (msg) -> send_update_observable(ctx, key, msg))
        on(SyncCallback(ctx, f), ob)
    end
end

function onjs(ob::AbstractObservable, f)
    if haskey(observ_id_dict, ob)
        ctx, key = observ_id_dict[ob]
        ctx = ctx.value
        # make sure updates are set up to propagate to JS
        ensure_sync(ctx, key)
        onjs(ctx, key, f)
    else
        error("This observable is not associated with any scope.")
    end
end

function Base.show(io::IO, ::WEBIO_NODE_MIME, x::Scope)
    write(io, JSON.json(render(x)))
end
function Base.show(io::IO, m::MIME"text/html", x::Scope)
    show(io, m, render(x))
end

function _show(io::IO, el::Scope, indent_level=0)
    showindent(io, indent_level)
    _show(io, el.dom, indent_level)
end

Base.@deprecate_binding Context Scope
Base.@deprecate handle! on
Base.@deprecate handlejs! onjs
