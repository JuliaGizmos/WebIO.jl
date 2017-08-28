using JSON

export Widget,
       AbstractConnection,
       withcontext,
       Observable,
       setobservable!,
       on, onjs,
       ondependencies,
       adddeps!,
       after

import Base: send
import Observables: Observable

"""
    Widget(id; kwargs...)

An object which can send and receive messages.

Fields:
- `id::String`: A unique ID
- `outbox::Channel`: Channel for outgoing messages
- `dependencies`: An array of js/html/css assets to load
  before rendering the contents of a context.
"""
immutable Widget
    id::AbstractString
    outbox::Channel
    observs::Dict{String, Tuple{Observable, Union{Void,Bool}}} # bool marks if it is synced
    dependencies
    jshandlers
end

const contexts = Dict{String, Widget}()

function Widget(
        id::String=newid("context");
        outbox::Channel=Channel{Any}(32),
        observs::Dict=Dict(),
        dependencies::AbstractArray=[],
        jshandlers::Dict=Dict(),
    )

    if haskey(contexts, id)
        warn("A context by the id $id already exists. Overwriting.")
    end

    contexts[id] = Widget(id, outbox, observs, dependencies, jshandlers)
end

function Observables.on(f, w::Widget, cmd)
    listener, _ = Base.@get! w.observs cmd (Observable{Any}(w, cmd, nothing), nothing)
    on(f, listener)
end

# we need to maintain mapping from an ID to observable
# in order to allow interpolation of observables.
const observ_id_dict = WeakKeyDict()

function setobservable!(ctx, cmd, obs; sync=nothing)
    if haskey(ctx.observs, cmd)
        warn("An observable named $cmd already exists in context $(ctx.id).
             Overwriting.")
    end

    ctx.observs[cmd] = (obs, sync)

    # the following metadata is stored for use in interpolation
    # of observables into DOM trees and `@js` expressions
    observ_id_dict[obs]  = (WeakRef(ctx), cmd)
    obs
end

function (::Type{Observable{T}}){T}(ctx::Widget, cmd, value; sync=nothing)
    setobservable!(ctx, cmd, Observable{T}(value), sync=sync)
end

function Observable{T}(ctx::Widget, cmd, val::T; sync=nothing)
    Observable{T}(ctx, cmd, val; sync=sync)
end

const Observ = Observable

function Base.getindex(c::Widget, cmd)
    (Base.@get! ctx.observs cmd (Observable{Any}(ctx, cmd, nothing), nothing))[1]
end

function adddeps!(ctx, xs::String)
    push!(ctx.dependencies, xs)
end

function adddeps!(ctx, xs::AbstractArray)
    append!(ctx.dependencies, xs)
end

function JSON.lower(x::Widget)
    Dict(
        "id" => x.id,
        "dependencies" => lowerdeps(x.dependencies),
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
         "value" => ob[])
end

function lowerdeps(x::String)
    if endswith(x, ".js")
        return Dict{String,String}("type"=>"js", "url"=>x)
    elseif endswith(x, ".css")
        return Dict{String,String}("type"=>"css", "url"=>x)
    elseif endswith(x, ".html")
        return Dict{String,String}("type"=>"html", "url"=>x)
    else
        error("WebIO can't load dependency of unknown type $x")
    end
end

lowerdeps(x::Dict) = x

lowerdeps(xs::AbstractArray) = map(lowerdeps, xs)

function send(ctx::Widget, cmd, data)
    command_data = Dict(
      "type" => "command",
      "context" => ctx.id,
      "command" => cmd,
      "data" => data,
    )
    put!(ctx.outbox, command_data)
    nothing
end

macro evaljs(ctx, expr)
    :(send($(esc(ctx)), "Basics.eval", jsexpr($(Expr(:quote, expr)))))
end

function after(ctx::Widget, promise_name, expr)
    @evaljs ctx begin
        @var widget = this;
        this.promises[$promise_name].
            then(val -> $expr.call(widget, val))
    end
end

function ondependencies(ctx, f)
    after(ctx, "dependenciesLoaded", @js deps -> $f.apply(this, deps))
end

const waiting_messages = Dict{String, Condition}()

function send_sync(ctx::Widget, cmd, data)
    msgid = string(rand(UInt128))
    command_data = Dict(
      "type" => "command",
      "context" => ctx.id,
      "messageId" => msgid,
      "command" => cmd,
      "data" => data,
      "sync" => true,
    )
    cond = Condition()
    waiting_messages[msgid] = cond
    send(ctx.outbox, command_data)
    wait(cond)
end

const lifecycle_commands = ["widget_created"]
function dispatch(ctx, cmd, data)
    if haskey(ctx.observs, cmd)
        Observables.setexcludinghandlers(ctx.observs[cmd][1], data, x->!isa(x, Backedge))
    else
        cmd ∈ lifecycle_commands ||
            warn("$cmd does not have a handler for context id $(ctx.id)")
    end
end

function onjs(ctx, cmd, f)
    push!(Base.@get!(ctx.jshandlers, cmd, []), f)
end

function offjs(ctx, cmd, f)
    if f in get(ctx.jshandlers, cmd, [])
        cmds = ctx.jshandlers[cmd]
        deleteat!(cmds, findin(cmds, f))
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
function ensure_js_updates(ctx, cmd, ob)
    if !any(x->isa(x, Backedge) && x.ctx==ctx, ctx.observs[cmd][1].listeners)
        f = Backedge(ctx, (msg) -> send(ctx, cmd, msg))
        on(Backedge(ctx, f), ob)
    end
end

function onjs(ob::Observable, f)
    if haskey(observ_id_dict, ob)
        ctx, cmd = observ_id_dict[ob]
        ctx = ctx.value
        # make sure updates are set up to propagate to JS
        ensure_js_updates(ctx, cmd, ob)
        onjs(ctx, cmd, f)
    else
        error("This observable is not associated with any context.")
    end
end

function withcontext(ctx::Widget, contents...; kwargs...)
    Node(ctx, contents...; kwargs...)
end

function withcontext(f::Function, args...; kwargs...)
    ctx = Widget(args...; kwargs...)
    Node(ctx, f(ctx))
end

function (ctx::Widget)(args...; kwargs...)
    withcontext(ctx, args...; kwargs...)
end

convert(::Type{Node}, ctx::Widget) = ctx()

Base.@deprecate_binding Context Widget
Base.@deprecate handle! on
Base.@deprecate handlejs! onjs
