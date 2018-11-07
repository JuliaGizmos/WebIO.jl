export Sync

struct Sync
    xs::AbstractArray
end

function islocal(x)
    !any(startswith.(x, ("//", "https://", "http://", "ftp://")))
end


function path2url(path::AbstractString)
    if startswith(path, "/pkg/")
        @warn("/pkg/ URLs are deprecated, load files with their absolute path in Scope")
        return path
    elseif startswith(path, "/assetserver/") && haskey(AssetRegistry.registry, path)
        return path
    elseif isfile(abspath(path))
        path = abspath(path)
        # first lookup to see if any of the file itself or any of the parent
        # directories are registered.
        AssetRegistry.isregistered(path) && AssetRegistry.getkey(path)
        cur_path = path
        while true
            if AssetRegistry.isregistered(cur_path) && isdir(cur_path)
                key = AssetRegistry.getkey(cur_path)
                url = key * "/" * replace(path, cur_path => "")
                return url
            end
            cur_path1 = dirname(cur_path)
            if cur_path1 == cur_path
                # this means we have reached root directory,
                # and none of the parents are in registry
                # register the original path uniquely
                return AssetRegistry.register(path)
            end
            cur_path = cur_path1
        end
    else
        error("Dependency is neither a url, nor a file, nor registered with AssetRegistry: $path")
    end
end

function dep2url(dep::AbstractString)
    # if is an url, we are done :)
    islocal(dep) || return dep
    query_parts = split(dep, "?") # remove anything after ?
    file_path = first(query_parts)
    query_part = length(query_parts) == 2 ? query_parts[2] : ""
    url = path2url(file_path)
    return string(baseurl[], url, query_part)
end


function lowerdeps(name, imp)
    url = dep2url(imp)
    extension = split(url, '.')[end]
    if !(extension in ("js", "css", "html"))
        error("WebIO can't load dependency of unknown type $url")
    end
    return Dict{String,Any}(
        "type" => extension,
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
