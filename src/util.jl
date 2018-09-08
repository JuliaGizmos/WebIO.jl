using FunctionalCollections
using Random: MersenneTwister
using UUIDs

const newid = let rng = MersenneTwister()
    function(prefix)
        string(prefix, '-', uuid4(rng))
    end
end

_pvec(x::PersistentVector) = x
_pvec(x::AbstractArray) = pvec(x)

# b can be array of pairs / kwargs etc.
function recmerge!(a, b, f=recmerge!)
    for (k, v) in b
        if isa(v, AbstractDict) && haskey(a, k) && isa(a[k], AbstractDict)
            a[k] = f(a[k], v)
        else
            a[k] = v
        end
    end
    a
end

recmerge(a, b) = recmerge!(Dict{Any, Any}(a), b, recmerge)

function kebab2camel(str)
    strs = split(str, "-")
    titlefrom2 = titlecase.(strs[2:end])
    join([strs[1]; titlefrom2], "")
end

function camel2kebab(str)
    lowstr = lowercase(str)
    lowercaseidxs = Vector{Char}(lowstr) .== Vector{Char}(str)
    sb = IOBuffer()
    for (i,c) in enumerate(lowercase(str))
        !lowercaseidxs[i] && print(sb, '-')
        print(sb, c)
    end
    String(take!(sb))
end
