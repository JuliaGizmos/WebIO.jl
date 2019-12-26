export evaljs

"""
    evaljs(ctx, expr; result=false)

Evaluate JavaScript using the given `ctx` (typically either a [`Scope`](@ref)
or a [`AbstractConnection`](@ref)).

If `result=true` is specified, the result of the JavaScript evaluation is
returned using WebIO's request machinery (see [`WebIO.request`](@ref) for the
potential pitfalls of using requests with WebIO).

# Examples
We can broadcast `evaljs` commands to every connection that is active for a
given `Scope`.
```julia
using WebIO, JSExpr

scope = Scope(...)
display(scope)

# BEWARE: This will deadlock on IJulia
# Wait for connections
wait(scope)
evaljs(scope, js"console.log('Hello, world!')")
```

**TODO: Figure out API for sending things to exactly one connection.**
"""
function evaljs(scope::Scope, expr; result::Bool=false)
    evaljs(scope.pool, expr; result=result, scope=scope)
end

function evaljs(
        ctx,
        expr,
        ;
        result::Bool=false,
        scope::Union{Scope, Nothing}=nothing,
)
    payload = Dict(
        "expr" => expr,
        "scopeId" => scope !== nothing ? scopeid(scope) : nothing,
    )
    if result
        return request(ctx, "evaljs", payload)
    else
        return command(ctx, "evaljs", payload)
    end
end
