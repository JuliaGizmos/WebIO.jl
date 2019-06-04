using FunctionalCollections
using Random
_pvec(x::PersistentVector) = x
_pvec(x::AbstractArray) = pvec(x)

const newid = let rng = MersenneTwister()
    function (prefix)
        Base.depwarn("newid(prefix) is deprecated. Scopes don't need this anymore. To get the scope's id, use scopeid(scope)", :newid)
        string(prefix, '-', uuid4(rng))
    end
end
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

"""
Escape characters for a "safe" representation of JSON.

In particular, we escape '/' characters to avoid the presence of "</" (and
especially "</script>") which cause the browser to break out of the current
<script /> tag.
"""
function escape_json(s::String)
    # Replace all "/" with "\/"'s.
    # This prevents the browser from interpreting "</" as a close tag; since
    # everything within the string is JSON, any appearances of "/" should be
    # within strings and when the JSON is parsed, the "\/"'s will be interpreted
    # as just normal "/"'s.
    return replace(s, "/" => "\\/")
end

escape_json(x::Any) = escape_json(JSON.json(x))
