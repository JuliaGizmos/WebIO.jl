export JSAsset, CSSAsset

abstract type WebAsset
end

struct JSAsset <: WebAsset
    name::String
    url::String
end

struct CSSAsset <: WebAsset
    name::String
    url::String
end

path_to_url(path) = islocal(path) ? AssetRegistry.register(path) : path

function JSAsset(file_path::String)
    return JSAsset(file_path, path_to_url(file_path))
end

function CSSAsset(file_path::String)
    return CSSAsset(file_path, path_to_url(file_path))
end

function islocal(asset)
    !any(startswith.(asset, ("//", "https://", "http://", "ftp://")))
end

function jsexpr(asset::JSAsset)
    args = Dict(
        "url" => asset.url,
        "name" => asset.name,
    )
    return js"WebIO.loadJS($args)"
end

function jsexpr(asset::CSSAsset)
    args = Dict(
        "url" => asset.url,
        "name" => asset.name,
    )
    return js"WebIO.loadCSS($args)"
end

"""
Convert an (old style) import string into a WebAsset.
"""
function import_to_webasset(name::String)
    extension = lowercase(split(name, '.')[end])
    if extension == "css"
        return CSSAsset(name)
    elseif extension == "js"
        return JSAsset(name)
    end
    error("Unknown import extension: $(extension).")
end

function import_to_webasset(asset::Pair)
    name, path = asset
    extension = lowercase(split(path, '.')[end])
    if extension == "css"
        return CSSAsset(name, path_to_url(path))
    elseif extension == "js"
        return JSAsset(name, path_to_url(path))
    end
    error("Unknown import extension: $(extension).")
end

function import!(scope, x)
    Base.depwarn("import! is deprecated; use onmount and WebAsset instead.", :webio_depwarn_import)
    push!(scope.imports, import_to_webasset(x))
end

jsexpr(io, assets::Vector{WebAsset}) = jsexpr(io, map(jsexpr, assets))
