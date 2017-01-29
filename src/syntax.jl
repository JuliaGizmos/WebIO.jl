# adapted from Hiccup.jl
function cssparse(s)
  trimfirst(s) = s[2:end]
  props = Dict()
  id = match(r"#-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
  id == nothing || (props[:id] = trimfirst(id.match))
  classes = matchall(r"\.-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
  p = match(r"\[[^\]]+\]", s)
  if p != nothing
      m = strip(p.match, ['[',']'])
      props[:attributes] = Dict(map(x->Pair(split(x,"=")...), split(m, ",")))
  end
  isempty(classes) || (props[:className] = map(trimfirst, classes))
  tagm = match(r"^[^\.#\[\]]+", s)
  tagm == nothing && error("Invalid tag syntax $s")
  tag = tagm.match
  return tag, props
end

function makedom(tag, props)
    function dom(args...; kwargs...)
        mergeprops(Node(tag, [args...], props), Dict(kwargs))
    end
end

"""
    dom"div.<class>#<id>[<prop>=<value>,...]"(x...; kw...)
"""
macro dom_str(str)
    tagstr, props = cssparse(str)
    tag = Symbol(tagstr)
    makedom(tag, props)
end
