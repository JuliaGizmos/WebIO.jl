using JSON

export Context,
       AbstractConnection,
       withcontext,
       handle!,
       handlejs!,
       adddeps!,
       after

import Base: send

"""
    Context(id; kwargs...)

An object which can send and receive messages.

Fields:
- `id::String`: A unique ID
- `outbox::Channel`: Channel for outgoing messages
- `dependencies`: An array of js/html/css assets to load
  before rendering the contents of a context.
"""
immutable Context
    id::AbstractString
    outbox::Channel
    dependencies
    commands
end

const contexts = Dict{String, Context}()

function Context(
        id::String=newid("context");
        outbox::Channel=Channel(),
        dependencies::AbstractArray=[],
        commands::Dict=Dict(),
    )

    contexts[id] = Context(id, outbox, dependencies, commands)
end

function adddeps!(ctx, xs::String)
    push!(ctx.dependencies, xs)
end
function adddeps!(ctx, xs::AbstractArray)
    append!(ctx.dependencies, xs)
end

function JSON.lower(x::Context)
    Dict(
        "id" => x.id,
        "dependencies" => lowerdeps(x.dependencies),
        "commands" => x.commands,
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

function send(ctx::Context, cmd, data)
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

function after(ctx::Context, promise_name, expr)
    @evaljs ctx begin
        context.promises[$promise_name].
            then($expr)
    end
end

const waiting_messages = Dict{String, Condition}()
function send_sync(ctx::Context, cmd, data)
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

const handlers = Dict{String, Dict{Symbol, Vector}}()

function handle!(f, ctx::Context, cmd)
    ctx_handlers = Base.@get! handlers ctx.id Dict{Symbol, Vector}()
    cmd_handlers = Base.@get! ctx_handlers cmd Any[]
    push!(cmd_handlers, f)
    nothing
end

function dispatch(ctx, cmd, data)
    if haskey(handlers, ctx.id) && haskey(handlers[ctx.id], cmd)
        for f in handlers[ctx.id][cmd]
            f(data)
        end
    else
        warn("$cmd does not have a handler for context id $(ctx.id)")
    end
end

handlejs!(ctx, cmd, f) = ctx.commands[cmd] = f

function withcontext(ctx::Context, contents...; kwargs...)
    Node(ctx, contents...; kwargs...)
end

function withcontext(f::Function, args...; kwargs...)
    ctx = Context(args...; kwargs...)
    Node(ctx, f(ctx))
end

function (ctx::Context)(args...; kwargs...)
    withcontext(ctx, args...; kwargs...)
end

convert(::Type{Node}, ctx::Context) = ctx()
