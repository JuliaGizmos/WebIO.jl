let count=0
    global newid
    function newid(prefix)
        string(prefix, '-', count+=1)
    end
end

function ismorespecifc(f, argtypes, generic_argtypes)
    ms_spec = methods(f, argtypes).ms
    ms_gen = methods(f, generic_argtypes).ms

    if length(ms_gen) == 0
        error("ismorespecific: generic argument types " *
              "$generic_argtypes do not have a method for $f")
    end

    !((length(ms_spec) > 0)  &&
        ms_spec[1] === ms_gen[1])
end

_pvec(x::PersistentVector) = x
_pvec(x::AbstractArray) = pvec(x)

function recmerge(a, b)
    c = Dict{Any, Any}(a)
    for (k, v) in b
        if isa(v, Associative) && haskey(a, k) && isa(a[k], Associative)
            c[k] = recmerge(a[k], v)
        else
            c[k] = b[k]
        end
    end
    c
end

