export Asset, Async, Sync 

struct Asset
    filetype::String
    name::Union{Nothing, String}
    url::String
end

Asset(name, url) = Asset(getextension(url), name, url)
Asset(url) = Asset(nothing, url)
Asset(x::Pair) = Asset(x[1], x[2])
Asset(x::Asset) = x
function Asset(x::Dict)
    # TODO: deprecate this method
    x1 = Dict(string(k) => v for (k, v) in x)
    if haskey(x, "url")
        key = "url"
    else
        error("Dict import specification doesn't have key :url")
    end

    if haskey(x1, "type")
        return Asset(x1["type"], get(x1, "name", nothing),x1["url"])
    else
        return Asset(x1["type"], get(x1, "name", nothing),x1["url"])
    end
end

function JSON.lower(asset::Asset)
    Dict(
         "type" => asset.filetype,
         "url"  => dep2url(asset.url),
         "name" => asset.name,
    )
end

function tojs(asset::Asset)
    return js"WebIO.importResource($(JSON.lower(asset)))"
end

# Adding assets to scopes
import!(scope::Scope, x) = push!(scope.imports, Asset(x))

struct Sync
    imports::AbstractArray
end
struct Async
    imports::AbstractArray
end

# This allow js"await $(Async([....]))" on a tree of assets!
function tojs(asset::Union{Async,Sync})
    return js"WebIO.importBlock($(lowerassets(asset)))"
end

# The output of lowerassets is initially sent with the Scope
# this should trigger loading of the assets before onmount callbacks
lowerassets(x) = JSON.lower(Asset(x))
lowerassets(x::Asset) = JSON.lower(x)
lowerassets(x::Async) = Dict(
    "type" => "async_block",
    "data" => map(lowerassets, x.imports),
)
lowerassets(x::AbstractArray) = lowerassets(Async(x))
lowerassets(x::Sync) = Dict(
    "type"=>"sync_block",
    "data" => map(lowerassets, x.imports),
)


## Utilities

function getextension(x)
    lowercase(last(split(first(split(x, "?")), ".")))
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
    query_part = length(query_parts) >= 2 ? "?" * query_parts[2] : ""
    url = path2url(file_path)
    return string(baseurl[], url, query_part)
end

Base.@deprecate adddeps!(scope, x) import!(scope, x)
