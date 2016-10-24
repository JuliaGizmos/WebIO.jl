using JSON

export Context, makecontext, handle, handlejs, pushrequires

import Base: send

providers = Any[]

push_provider!(x) = push!(providers, x)
pop_provider!()  = pop!(providers)
current_provider()  = providers[end]


immutable Context
    id::AbstractString
    provider
    requires
    commands
end

Context(
    id=newid("context");
    provider=current_provider(),
    requires=[],
    commands=Dict(),
) = Context(id, provider, requires, commands)

JSON.lower(x::Context) = Dict("id" => x.id) # skip the rest


function send(ctx::Context, cmd, data)
    command_data = Dict(
      "type" => "command",
      "nodeType" => "Context",
      "context" => ctx.id,
      "command" => cmd,
      "data" => data,
    )
    send(ctx.provider, command_data)
end


const handlers = Dict{String,Dict{Symbol, Vector}}()

function handle(f, ctx::Context, cmd)
    ctx_handlers = Base.@get! handlers ctx.id Dict{Symbol, Vector}()
    cmd_handlers = Base.@get! ctx_handlers cmd Any[]
    push!(cmd_handlers, f)
end

function dispatch(data)
    dispatch(data["context"], Symbol(data["command"]), data["data"])
end

function dispatch(ctxid, cmd, data)
    if haskey(handlers, ctxid) && haskey(handlers[ctxid], cmd)
        for f in handlers[ctxid][cmd]
            f(data)
        end
    else
        warn("$cmd does not have a handler for context id $(ctxid)")
    end
end

function makecontext(
        f::Function,
        id=newid("context");
        provider=current_provider(),
        requires=[],
        commands=Dict()
    )
    ctx = Context(id, provider, requires, commands)
    ctx(f(ctx))
end

pushrequires(ctx, xs) = push!(ctx.requires, xs)
handlejs(ctx, cmd, f) = ctx.commands[cmd] = f

function (ctx::Context)(args...; kwargs...)
    Node(
        ctx, args...;
        id=ctx.id,
        requires=ctx.requires,
        commands=ctx.commands,
        kwargs...
    )
end
convert(::Type{Node}, ctx::Context) = ctx()
