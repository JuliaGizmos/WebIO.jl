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
       onimport,
       ondependencies,
       adddeps!,
       import!,
       addconnection!

import Compat.Sockets: send
import Observables: Observable

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
    observs::Dict{String, Tuple{Observable, Union{Nothing,Bool}}} # bool marks if it is synced
    private_obs::Set{String}
    systemjs_options
    imports
    jshandlers
    pool::ConnectionPool
end

const scopes = Dict{String, Scope}()

function Scope(id::String=newid("scope");
        dom=dom"span"(),
        outbox::Channel=Channel{Any}(Inf),
        observs::Dict=Dict(),
        private_obs::Set{String}=Set{String}(),
        dependencies=nothing,
        systemjs_options=nothing,
        imports=[],
        jshandlers::Dict=Dict()
    )

    if dependencies !== nothing
        warn("dependencies key word argument is deprecated, use imports instead")
        imports = dependencies
    end

    if haskey(scopes, id)
        warn("A scope by the id $id already exists. Overwriting.")
    end

    pool = ConnectionPool(outbox)

    scopes[id] = Scope(id, dom, observs, private_obs, systemjs_options, imports, jshandlers, pool)
end
Base.@deprecate Scope(id::AbstractString; kwargs...) Scope(; id=id, kwargs...)

(w::Scope)(arg) = (w.dom = arg; w)

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
        warn("An observable named $key already exists in scope $(ctx.id).
             Overwriting.")
    end

    ctx.observs[key] = (obs, sync)

    # the following metadata is stored for use in interpolation
    # of observables into DOM trees and `@js` expressions
    observ_id_dict[obs]  = (WeakRef(ctx), key)
    obs
end

# Ask JS to send stuff
function setup_comm(f, ob::Observable)
    if haskey(observ_id_dict, ob)
        scope, key = observ_id_dict[ob]
        if !(key in scope.value.private_obs)
            evaljs(scope.value, js"""
                   console.log(this)
                   this.observables[$key].sync = true
            """)
        end
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

function (::Type{Observable{T}})(ctx::Scope, key, value; sync=nothing) where {T}
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
            sync = any(f-> !isa(f, Backedge), ob.listeners)
        end
        obs_dict[k] = Dict("sync" => sync,
             "value" => ob[],
             "id" => obsid(ob))
    end
    Dict(
        "id" => x.id,
        "systemjs_options" => x.systemjs_options,
        "imports" => lowerdeps(x.imports),
        "handlers" => x.jshandlers,
        "observables" => obs_dict)
end

function render(s::Scope)
    Node(s, s.dom)
end

function send(ctx::Scope, key, data)
    command_data = Dict(
      "type" => "command",
      "scope" => ctx.id,
      "command" => key,
      "data" => data,
    )
    send(ctx.pool, command_data)
    nothing
end

macro evaljs(ctx, expr)
    warn("@evaljs is deprecated, use evaljs function instead")
    :(send($(esc(ctx)), "Basics.eval", $(esc(expr))))
end

function evaljs(ctx, expr)
    send(ctx, "Basics.eval", expr)
end

function onimport(scope::Scope, f)
    promise_name = "importsLoaded"
    jshandlers = scope.jshandlers
    if !haskey(jshandlers, "_promises")
        jshandlers["_promises"] = Dict()
    end
    if !haskey(jshandlers["_promises"], promise_name)
        jshandlers["_promises"][promise_name] = []
    end
    push!(jshandlers["_promises"][promise_name], f)
end

Base.@deprecate ondependencies(ctx, jsf) onimport(ctx, jsf)

const waiting_messages = Dict{String, Condition}()

function send_sync(ctx::Scope, key, data)
    msgid = string(rand(UInt128))
    command_data = Dict(
      "type" => "command",
      "scope" => ctx.id,
      "messageId" => msgid,
      "command" => key,
      "data" => data,
      "sync" => true,
    )
    cond = Condition()
    waiting_messages[msgid] = cond
    send(ctx.outbox, command_data)
    wait(cond)
end

const lifecycle_commands = ["scope_created"]
function dispatch(ctx, key, data)
    if haskey(ctx.observs, string(key))
        Observables.setexcludinghandlers(ctx.observs[key][1], data, x->!isa(x, Backedge))
    else
        key ∈ lifecycle_commands ||
            warn("$key does not have a handler for scope id $(ctx.id)")
    end
end

function onjs(ctx, key, f)
    push!(Base.@get!(ctx.jshandlers, key, []), f)
end

function offjs(ctx, key, f)
    if f in get(ctx.jshandlers, key, [])
        keys = ctx.jshandlers[key]
        deleteat!(keys, findin(keys, f))
    end
    nothing
end

# Backedge denotes that the function updates the
# counter part of the same observable. When we
# receive messages from the client, we skip updating
# the backedges using Observables.setexcludinghandlers
struct Backedge
    ctx
    f
end

(s::Backedge)(xs...) = s.f(xs...)
function ensure_js_updates(ctx, key, ob)
    if !any(x->isa(x, Backedge) && x.ctx==ctx, ctx.observs[key][1].listeners)
        f = Backedge(ctx, (msg) -> send(ctx, key, msg))
        on(Backedge(ctx, f), ob)
    end
end

function onjs(ob::Observable, f)
    if haskey(observ_id_dict, ob)
        ctx, key = observ_id_dict[ob]
        ctx = ctx.value
        # make sure updates are set up to propagate to JS
        ensure_js_updates(ctx, key, ob)
        onjs(ctx, key, f)
    else
        error("This observable is not associated with any scope.")
    end
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
