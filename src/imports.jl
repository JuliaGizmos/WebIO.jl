export Sync

struct Sync
    xs::AbstractArray
end

function lowerdeps(name, x)
    if endswith(x, ".js")
        return Dict{String,Any}("type"=>"js", "name"=>name, "url"=>x)
    elseif endswith(x, ".css")
        return Dict{String,Any}("type"=>"css", "name"=>name, "url"=>x)
    elseif endswith(x, ".html")
        return Dict{String,Any}("type"=>"html", "name"=>name, "url"=>x)
    else
        error("WebIO can't load dependency of unknown type $x")
    end
end

lowerdeps(x::String) = lowerdeps(nothing, x)
lowerdeps(x::Pair) = lowerdeps(x[1], x[2])
lowerdeps(x::Dict) = x

lowerdeps(xs::AbstractArray) = Dict(
    "type" => "async_block",
    "data" => map(lowerdeps, xs),
)

lowerdeps(x::Sync) = Dict("type"=>"sync_block",
                          "data" => map(lowerdeps, x.xs))

function import!(scope, xs)
    push!(scope.imports, xs)
end

Base.@deprecate adddeps!(scope, x) import!(scope, x)
