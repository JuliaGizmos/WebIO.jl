export Sync

struct Sync
    xs::AbstractArray
end

function islocal(x)
    !any(startswith.((x,), ["//", "https://", "http://", "ftp://"]))
end

function lowerdeps(name, imp)
    query_parts = split(imp, "?") # remove anything after ?
    imp_path = query_parts[1]

    if startswith(imp_path, "/pkg/")
        Base.warn_once("/pkg/ URLs are deprecated, load files with their absolute path in Scope")
        url = baseurl[] * imp
    elseif islocal(imp_path) && isfile(abspath(imp_path))
        path = abspath(imp_path)
        # first lookup to see if any of the file itself or any of the parent
        # directories are registered.
        cur_path = path
        if AssetRegistry.isregistered(cur_path)
            url = AssetRegistry.getkey(cur_path)
            @goto dict
        end
        while true
            if AssetRegistry.isregistered(cur_path) && isdir(cur_path)
                key = AssetRegistry.getkey(cur_path)
                url = baseurl[] * key * "/" * replace(path, cur_path => "")
                break
            end
            cur_path1 = dirname(cur_path)
            if cur_path1 == cur_path
                # this means we have reached root directory,
                # and none of the parents are in registry
                # register the original path uniquely
                url = AssetRegistry.register(imp_path)
                break
            end
            cur_path = cur_path1
        end
        if length(query_parts) > 1
            url *= "?" * join(query_parts[2:end], "?")
        end
    else
        url = imp
    end

    allowed_types = ["js", "css", "html"]

    if !any(endswith.((imp_path,), allowed_types))
        error("WebIO can't load dependency of unknown type $url")
    end

    @label dict

    return Dict{String,Any}(
        "type" => split(imp_path, ".")[end],
        "name" => name,
        "url" => url
    )
end

lowerdeps(x::String) = lowerdeps(nothing, x)
lowerdeps(x::Pair) = lowerdeps(x[1], x[2])
function lowerdeps(x::Dict)
    if haskey(x, "url")
        key = "url"
    elseif haskey(x, :url)
        key = :url
    else
        error("Dict import specification doesn't have key :url")
    end

    url = x[key]
    dict = lowerdeps(nothing, url)
    x1 = copy(x)
    x1[key] = dict["url"]
    x1
end

lowerdeps(xs::AbstractArray) = Dict(
    "type" => "async_block",
    "data" => map(lowerdeps, xs),
)

lowerdeps(x::Sync) = Dict("type"=>"sync_block",
                          "data" => map(lowerdeps, x.xs))

function import!(scope, x)
    push!(scope.imports, x)
end

Base.@deprecate adddeps!(scope, x) import!(scope, x)
