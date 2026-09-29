using JSON

# JSON.jl compatibility
#
# JSON.jl < 1 writes non-finite floats as `null`, whereas JSON.jl v1 throws on
# them by default. `jsonstring` keeps the JSON.jl < 1 behavior for everything
# WebIO serializes for the frontend (messages, rendered nodes and scopes). See
# also `JSEvalSerialization` in `syntax.jl`, which does the same for `js"..."`
# interpolation.
@static if isdefined(JSON, :JSONStyle) # JSON.jl >= 1
    struct WebIOSerialization <: JSON.JSONStyle end
    JSON.lower(::WebIOSerialization, x::AbstractFloat) = isfinite(x) ? x : nothing

    jsonstring(x) = JSON.json(x; style=WebIOSerialization())
else
    jsonstring(x) = JSON.json(x)
end
