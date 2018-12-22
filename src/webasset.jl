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

function JSAsset(file_path::String)
    asset_url = islocal(file_path) ? AssetRegistry.register(file_path) : file_path
    return JSAsset(file_path, asset_url)
end

function CSSAsset(file_path::String)
    asset_url = islocal(file_path) ? AssetRegistry.register(file_path) : file_path
    return CSSAsset(file_path, asset_url)
end

function islocal(asset)
    !any(startswith.(x, ("//", "https://", "http://", "ftp://")))
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

function import_to_webasset(name::String)
    extension = lowercase(split(name, '.')[end])
    if extension == "css"
        return CSSAsset(name)
    elseif extension == "js"
        return JSAsset(name)
    end
    error("Unknown import extension: $(extension).")
end

jsexpr(io, assets::Vector{WebAsset}) = jsexpr(io, map(jsexpr, assets))
