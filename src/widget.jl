using JSON

export Widget,
       AbstractConnection,
       withcontext,
       Observable,
       handle!,
       handlejs!,
       on, onjs,
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
    observs::Dict{String, Observable}
    dependencies
    jshandlers
end

const contexts = Dict{String, Widget}()

function Widget(
        id::String=newid("context");
        outbox::Channel=Channel(),
        observs::Dict=Dict(), # Basically, signals and slots
        dependencies::AbstractArray=[],
        jshandlers::Dict=Dict(),
    )

    if haskey(contexts, id)
        warn("A context by the id $id already exists. Overwriting.")
    end

    contexts[id] = Widget(id, outbox, observs, dependencies, jshandlers)
end

function Observables.on(f, ctx::Widget, cmd)
    listener = Base.@get! ctx.observs cmd Observable{Any}(ctx, cmd, nothing)
    on(f, listener)
end

# we need to maintain mapping from an ID to observable
# in order to allow interpolation of observables.
const observ_id_dict = WeakKeyDict()

function (::Type{Observable{T}}){T}(ctx::Widget, cmd, value)
    if haskey(ctx.observs, cmd)
        warn("An observable named $cmd already exists in context $(ctx.id).
             Overwriting.")
    end

    o = ctx.observs[cmd] = Observable{T}(value)

    # the following metadata is stored for use in interpolation
    # of observables into DOM trees and `@js` expressions
    observ_id_dict[o]  = (WeakRef(ctx), cmd)
    o
end

function Observable{T}(ctx::Widget, cmd, val::T)
    Observable{T}(ctx, cmd, val)
end

const Observ = Observable

function Base.getindex(c::Widget, cmd)
    Base.@get! ctx.observs cmd Observable{Any}(ctx, cmd, nothing)
end

function jsexpr(io, o::Observable)
    if !haskey(observ_id_dict, o)
        error("No context associated with observer being interpolated")
    end
    _ctx, cmd = observ_id_dict[o]
    _ctx.value === nothing && error("Widget of the observable no more exists.")
    ctx = _ctx.value

    obsobj = Dict("type" => "observable",
                  "context" => ctx.id,
                  "value" => o[],
                  "command" => cmd)

    jsexpr(io, obsobj)
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
        "commands" => x.jshandlers,
    ) # skip the rest
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
        context.promises[$promise_name].
            then($expr)
    end
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

function dispatch(ctx, cmd, data)
    if haskey(ctx.observs, cmd)
        ctx.observs[cmd][] = data
    else
        warn("$cmd does not have a handler for context id $(ctx.id)")
    end
end

onjs(ctx, cmd, f) = ctx.jshandlers[cmd] = f
function onjs(ob::Observable, f)
    if haskey(observ_id_dict, ob)
        ctx, cmd = observ_id_dict[ob]
        ctx = ctx.value
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
