using JSON

export Context,
       AbstractConnection,
       withcontext,
       handle!,
       handlejs!,
       pushrequires!

import Base: send

"""
    Context(id; kwargs...)

An object which can send and receive messages.

Fields:
- `id::String`: A unique ID
- `outbox::Channel`: Channel for outgoing messages
- `requires`: An array of js/html/css assets to load
  before rendering the contents of a context.
"""
immutable Context
    id::AbstractString
    outbox::Channel
    requires
    commands
end

const contexts = Dict{String, Context}()

function Context(
        id::String=newid("context");
        outbox::Channel=Channel(),
        requires::AbstractArray=[],
        commands::Dict=Dict(),
    )

    contexts[id] = Context(id, outbox, requires, commands)
end

function JSON.lower(x::Context)
    Dict(
        "id" => x.id,
        "requires" => x.requires,
        "commands" => x.commands,
    ) # skip the rest
end

function send(ctx::Context, cmd, data)
    command_data = Dict(
      "type" => "command",
      "context" => ctx.id,
      "command" => cmd,
      "data" => data,
    )
    send(ctx.outbox, command_data)
    nothing
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

abstract AbstractConnection

function send(c::AbstractConnection, msg)
    error("No send method for connection of type $(typeof(c))")
end

function log(c::AbstractConnection, msg, level="info", data=nothing)
    send(c, Dict("type"=>"log", "message"=>msg, "level"=>level, data=>data))
    if level == "error" || level == "warn"
        warn(msg)
    else
        info(msg)
    end
end

function dispatch(conn::AbstractConnection, data)
    # first, check if the message is one of the administrative ones
    cmd = data["command"]
    ctxid = data["context"]
    if cmd == "_setup_context"
        if haskey(contexts, ctxid)
            ctx = contexts[ctxid]
            @async while true
                msg = take!(ctx.outbox)
                send(conn, msg)
            end
        else
            log(conn, "Client says it has unknown context $ctxid", "warn")
        end
    elseif cmd == "_acknowledge_message"
        msgid = data["messageId"]
        if haskey(waiting_messages, msgid)
            notify(waiting_messages[msgid])
            delete!(waiting_messages, msgid)
        else
            log(conn,
                "Acknowledgement received for message" *
                "$msgid but not waiting for it",
                "warn")
        end
    else
        contexts[ctxid]
        dispatch(ctxid, Symbol(cmd), data["data"])
    end
end

function dispatch(ctxid, cmd, data)
    if haskey(handlers, ctxid) && haskey(handlers[ctxid], cmd)
        for f in handlers[ctxid][cmd]
            f(data)
        end
    else
        if haskey(contexts, ctxid)
            log(conn,
                "$cmd does not have a handler for context id $(ctxid)",
                "warn")
        end
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
