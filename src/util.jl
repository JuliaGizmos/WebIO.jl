using FunctionalCollections

let count=0
    global newid
    function newid(prefix)
        string(prefix, '-', count+=1)
    end
end

_pvec(x::PersistentVector) = x
_pvec(x::AbstractArray) = pvec(x)

# b can be array of pairs / kwargs
function recmerge(a, b)
    c = Dict{Any, Any}(a) # XXX: should we enforce all props to be strings?
    for (k, v) in b
        if isa(v, Associative) && haskey(a, k) && isa(a[k], Associative)
            c[k] = recmerge(a[k], v)
        else
            c[k] = v
        end
    end
    c
end

