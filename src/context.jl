using JSON

export Context, handle

import Base: send

providers = Any[]

push_provider!(x) = push!(providers, x)
pop_provider!()  = pop!(providers)
current_provider()  = providers[end]


immutable Context
    id::AbstractString
    provider
end

Context(id=newid("context"); provider=current_provider()) = Context(id, provider)
JSON.lower(x::Context) = Dict("id" => x.id) # skip the provider


function send(ctx::Context, cmd, data)
    send(ctx.provider, ctx.id, cmd, data)
end


const handlers = Dict{String,Dict{Symbol, Vector}}()

function handle(f, ctx::Context, cmd)
    ctx_handlers = Base.@get! handlers ctx.id Dict{Symbol, Vector}()
    cmd_handlers = Base.@get! ctx_handlers cmd Any[]
    push!(cmd_handlers, f)
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

function Context(
        f::Function,
        id=newid("context");
        provider=current_provider(),
        requires=[],
        commands=[]
    )
    ctx = Context(id, provider)
    Node(ctx, f(ctx), id=id, requires=requires, commands=[])
end

(ctx::Context)(args...; kwargs...) = Node(ctx, args...; id=ctx.id, kwargs...)
