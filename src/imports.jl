export Sync

struct Sync
    xs::AbstractArray
end

function lowerdeps(x::String)
    if endswith(x, ".js")
        return Dict{String,String}("type"=>"js", "url"=>x)
    elseif endswith(x, ".css")
        return Dict{String,String}("type"=>"css", "url"=>x)
    elseif endswith(x, ".html")
        return Dict{String,String}("type"=>"html", "url"=>x)
    else
        error("WebIO can't load dependency of unknown type $x")
    end
end

lowerdeps(x::Dict) = x

lowerdeps(xs::AbstractArray) = Dict(
    "type" => "async_block",
    "data" => map(lowerdeps, xs),
)

lowerdeps(x::Sync) = Dict("type"=>"sync_block",
                          "data" => map(lowerdeps, x.xs))

function import!(widget, xs)
    push!(widget.imports, xs)
end

Base.@deprecate adddeps!(widget, x) import!(widget, x)
