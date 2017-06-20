using FunctionalCollections

let count=0
    global newid
    function newid(prefix)
        string(prefix, '-', count+=1)
    end
end

_pvec(x::PersistentVector) = x
_pvec(x::AbstractArray) = pvec(x)

# b can be array of pairs / kwargs etc.
function recmerge!(a, b, f=recmerge!)
    for (k, v) in b
        if isa(v, Associative) && haskey(a, k) && isa(a[k], Associative)
            a[k] = f(a[k], v)
        else
            a[k] = v
        end
    end
    a
end

recmerge(a, b) = recmerge!(Dict{Any, Any}(a), b, recmerge)

