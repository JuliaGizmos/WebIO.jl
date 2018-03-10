export Sync

struct Sync
    xs::AbstractArray
end

function lowerdeps(name, x)
    simple_url = first(split(x, "?"))

    allowed_types = ["js", "css", "html"]

    for cur_type in allowed_types
      is_type = endswith(simple_url, ".$(cur_type)")
      is_type |= endswith(simple_url, "/$(cur_type)")

      is_type || continue

      cur_dict = Dict{String,Any}(
        "type" => cur_type,
        "name" => name,
        "url" => x
      )

      return cur_dict
    end

    error("WebIO can't load dependency of unknown type $x")
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
