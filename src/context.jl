import Base: send

providers = Any[]

push_provider!(x) = push!(providers, x)
pop_provider!()  = pop!(providers)
current_provider()  = providers[end]


immutable Context
    id::AbstractString
end

Context() = Context(newid())

function send(ctx::Context, cmd, data)
    send(ctx.provider, ctx.id, cmd, data)
end

const handlers = Dict()

function handle(f, ctx, cmd)
    ctx_handlers = Base.@get! handlers ctx.id Dict{Symbol, Vector}()
    cmd_handlers = Base.@get! ctx_handlers cmd Any[]
    push!(cmd_handlers, f)
end

function dispatch(ctxid, cmd, data)
    if haskey(handlers, ctxid) && haskey(handlers[ctxid], cmd)
        handlers[ctxid][cmd](data)
    else
        warn("$cmd does not have a handler for context id $(ctxid)")
    end
end

(ctx::Context)(xs) = Node((:dom, :fragment), xs, Dict("id"=>ctx.id))
