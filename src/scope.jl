using JSON

export Scope,
       AbstractConnection,
       withscope,
       Observable,
       setobservable!,
       on, onjs,
       onimport,
       ondependencies,
       adddeps!,
       import!,
       after

import Base: send
import Observables: Observable

"""
    Scope(id; kwargs...)

An object which can send and receive messages.

Fields:
- `id::String`: A unique ID
- `outbox::Channel`: Channel for outgoing messages
- `imports`: An array of js/html/css assets to load
  before rendering the contents of a scope.
"""
mutable struct Scope
    id::AbstractString
    dom::Any
    outbox::Channel
    observs::Dict{String, Tuple{Observable, Union{Void,Bool}}} # bool marks if it is synced
    imports
    jshandlers
end

const scopes = Dict{String, Scope}()

function Scope(id::String=newid("scope");
        dom=nothing,
        outbox::Channel=Channel{Any}(32),
        observs::Dict=Dict(),
        dependencies=nothing,
        imports=[],
        jshandlers::Dict=Dict(),
    )

    if dependencies !== nothing
        warn("dependencies key word argument is deprecated, use imports instead")
        imports = dependencies
    end

    if haskey(scopes, id)
        warn("A scope by the id $id already exists. Overwriting.")
    end

    scopes[id] = Scope(id, dom, outbox, observs, imports, jshandlers)
end
Base.@deprecate Scope(id::AbstractString; kwargs...) Scope(; id=id, kwargs...)

(w::Scope)(arg) = (w.dom = arg; w)

function Observables.on(f, w::Scope, key)
    key = string(key)
    listener, _ = Base.@get! w.observs key (Observable{Any}(w, key, nothing), nothing)
    on(f, listener)
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

function (::Type{Observable{T}}){T}(ctx::Scope, key, value; sync=nothing)
    setobservable!(ctx, key, Observable{T}(value), sync=sync)
end

function Observable{T}(ctx::Scope, key, val::T; sync=nothing)
    Observable{T}(ctx, key, val; sync=sync)
end

const Observ = Observable

include("imports.jl")

function JSON.lower(x::Scope)
    Dict(
        "id" => x.id,
        "imports" => lowerdeps(x.imports),
        "handlers" => x.jshandlers,
        "observables" => Dict(zip(keys(x.observs),
                                    map(lowerobserv, values(x.observs)))),
    ) # skip the rest
end

function lowerobserv(ob_)
    ob, sync = ob_
    if sync === nothing
        # by default, we sync if there are any listeners
        # other than the JS back edge
        sync = any(f-> !isa(f, Backedge), ob.listeners)
    end
    Dict("sync" => sync,
         "value" => ob[],
         "id" => obsid(ob))
end

function send(ctx::Scope, key, data)
    command_data = Dict(
      "type" => "command",
      "scope" => ctx.id,
      "command" => key,
      "data" => data,
    )
    put!(ctx.outbox, command_data)
    nothing
end

macro evaljs(ctx, expr)
    :(send($(esc(ctx)), "Basics.eval", $expr))
end

function after(ctx::Scope, promise_name, f)
    @evaljs ctx js"""
    var scope = this;
    this.promises[$promise_name].then(function (val) {
        ($f).call(scope, val);
    })
    """
end

function onimport(ctx, f)
    after(ctx, "importsLoaded", js"function (deps) { ($f).apply(this, deps); }")
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
immutable Backedge
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
    id = newid("scope")
    write(io, "<div class='display:none'></div>" *
          """<unsafe-script>
          WebIO.mount('$id', this.previousSibling,""")
    # NOTE: do NOT add space between </div> and <unsafe-script>
    jsexpr(io, Node(x, x.dom))
    write(io, ")</unsafe-script>")
end

function _show(io::IO, el::Scope, indent_level=0)
    showindent(io, indent_level)
    _show(io, el.dom, indent_level)
end

Base.@deprecate_binding Context Scope
Base.@deprecate_binding Widget Scope
Base.@deprecate handle! on
Base.@deprecate handlejs! onjs
