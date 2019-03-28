export @dom_str, @js, @js_str

# adapted from Hiccup.jl
function cssparse(s)
    # e.g. s = "img#theid.class1.class2[src=image.jpg, alt=great pic]"
    # parse props first
    p = match(r"\[[^\]]+\]", s)
    props = Dict()
    if p != nothing
        m = strip(p.match, ['[',']'])
        props[:attributes] = Dict(map(x->Pair(split(x,r"\s*=\s*", limit=2)...), split(m, r",\s*")))
        # s is now just the "img#class1.c2.thirdclass"
        s = s[1:p.offset-1]
    end
    trimfirst(str) = str[2:end]
    id = match(r"#-?[_a-zA-Z][_a-zA-Z0-9-]*", s)
    id == nothing || (props[:id] = trimfirst(id.match))
    classes = collect(m.match for m in eachmatch(r"\.-?[_a-zA-Z][_a-zA-Z0-9-]*", s))
    isempty(classes) || (props[:className] = join(map(trimfirst, classes), " "))
    tagm = match(r"^[^\.#\[\]]+", s)
    tagm == nothing && error("Invalid tag syntax $s")
    tag = tagm.match
    return tag, props
end

function makedom(tag, props)
    d = if occursin(":", string(tag))
        ns, t = split(string(tag), ":")
        DOM(Symbol(ns), Symbol(t))
    else
        DOM(:html, tag)
    end
    function dom(args...; kwargs...)
        n = node(d, args...)(Dict(kwargs))
        isempty(props) ? n : n(props)
    end
end

"""
    dom"div.<class>#<id>[<prop>=<value>,...]"(x...; kw...)
"""
macro dom_str(sraw)
    str = Meta.parse(string('"', sraw, '"'))
    quote
        tagstr, props = WebIO.cssparse($(esc(str)))
        tag = Symbol(tagstr)
        WebIO.makedom(tag, props)
    end
end

struct JSString
    s::String
end

# Required to allow JSStrings to interpolate into normal strings correctly.
Base.print(io::IO, x::JSString) = print(io, x.s)

"""
    Interpolator(s)

An iterator that yields _interpolation chunks (_i.e._ a string if the chunk was a string literal and
an `Expr` if the chunk was an interpolation).

# Examples
"""
struct Interpolator{S<:AbstractString}
    s::S
end

Base.iterate(interp::Interpolator, args...) = iterate_interpolations(interp.s, args...)
Base.IteratorSize(::Interpolator) = Base.SizeUnknown()

"""
    iterate_interpolations(s[, i])

Advance the iterator to obtain the next string or expression to be interpolated. If no parts
remain (where a part is either a string literal or an interpolation), return nothing; otherwise,
return a tuple with either a string or an `Expr` and the new iteration state.

# Examples
See `test/syntax.jl`.
"""
function iterate_interpolations(s, i=firstindex(s))
    # Notation:
    # i0 - start index
    # l - last index (length)
    # c - the most recently iterated character
    # i - current index (while iterating character-by-character)
    #     note: this is actually the index of the character **after** c
    # j - the end of the current "chunk" of string literal (when set)
    # escape_next - true if we should escape the next character
    # escape_current - true if c was preceded by an escape

    i0 = i
    l = lastindex(s)

    # Return nothing if we're past the end.
    if i0 > l
        return nothing
    end

    # Get the initial character (we have to handle the first character specially).
    c, i = iterate(s, i0)

    # Special case: when the first character is a $, it's an interpolation, so we return the
    # `Expr` of the interpolated _thing_.
    # For example, if `s` is `$foo</script>` (and `i` is 1), we should return `:foo`.
    if c == '$'
        # Note: at this point, `i` is after the `$`, so we parse `foo</script>` and return `foo`
        return Meta.parse(s, i, greedy=false, raise=false)
    end

    escape_next = (c == '\\')
    escape_current = false

    # Iterate over characters, stopping when we hit a `$` or run iterate through end of the string.
    while (c != '$') && i <= l
        c, i = iterate(s, i)
        if escape_next
            escape_current = true
            break
        elseif c == '\\'
            escape_next = true
        end
    end

    # If we have `\$`, we **don't** want to interpolate.
    if c == '$' && escape_current
        # Suppose the string is `this.\$refs = $myvar`. We don't want to interpolate a variable
        # named refs, but we do want to interpolate `myvar`. We set up indices j and k as follows.
        # t h i s . \ $ r e f s ␣ = ␣ \ $ m y v a r
        # i0      j     i           k             l
        # We form the string as s[i0:j] * "$" * s[i:k].
        # We get k by continuing to iterate, starting at position i (which is past the $ and thus
        # treated like a literal string).
        j = prevind(s, i, 3)
        # If we're at the end of the string, `iterate_interpolations` returns `nothing`.
        next_s, k = i < l ? iterate_interpolations(s, i) : ("", i)
        return (s[i0:j] * "\$" * next_s), k
    end

    if escape_current
        # Julia's string literal escaping logic gets wonky when quotes are involved.
        # For example, `console.log("\\")` gets passed to us as `console.log("\")`
        # whereas `foo = '\\\\'` gets passed to us exactly as written. The issue seems to be that
        # whenever quotes are involved, it eagerly consumes the backslashes in a weird way; but the
        # upshot of this is that if a user ever writes `\"`, it gets passed to as as just `"`, so
        # if we ever see `\"`, we know that the user actually wrote `\\"`.
        if c == '"'
            # j is the index of the quote (_i.e._ s[j] = '"')
            j = prevind(s, i)
            # We get the next chunk of string...
            next_s, k = i < l ? iterate_interpolations(s, i) : ("", i)
            # And then concatenate it.
            return s[i0:j] * next_s, k
        end
        j = prevind(s, i, 3)
        return s[i0:j] * "$c", i
    end

    # We don't have a preceeding backslash, so we **do** want to interpolate the **next** piece.
    # We do this by returning the current chunk of string literal and setting the iteration pointer
    # to the `$` so that the next call to `iterate_interpolations` knows to return an `Expr`.
    if c == '$'
        # Suppose s is `alert($thing)`.
        # Indices:           j i
        # We get j by shifting back twice (once so that s[i] == '$', and again so that s[i] == '(').
        # We also shift the position of the iterator back one so that the next call will have the
        # string beginning with the $ and will thus start interpolating.
        j = prevind(s, i, 2)
        return s[i0:j], prevind(s, i)
    end

    # If we get here, we're at the end of the string and we didn't find any interpolations or
    # escapes; so just return the rest of the string.
    return s[i0:prevind(s, i)], i
end

"""
    tojs(x)

Returns a JSString object that constructs the same object as `x`
"""
tojs(x) = x

"""
    showjs(io, x)

Print Javascript code to `io` that constructs the equivalent of `x`.
"""
showjs(io, x::Any) = JSON.show_json(io, JSEvalSerialization(), x)
showjs(io, x::AbstractString) = write(io, JSON.json(x))

"""
    @js_str(s)

Create a `JSString` using a string literal and perform interpolations from Julia.

# Examples
```julia-repl
julia> mystr = "foo"; mydict = Dict("foo" => "bar", "spam" => "eggs");
julia> println(js"const myStr = \$mystr; const myObject = \$mydict;")
const myStr = "foo"; const myObject = {"spam":"eggs","foo":"bar"};
```
"""
macro js_str(s)
    writes = map(Interpolator(s)) do x
        if isa(x, AbstractString)
            # If x is a string, it was specified in the js"..." literal so let it
            # through as-is.
            :(write(io, $(x)))
        else
            # Otherwise, it's some kind of interpolation so we need to generate a
            # JavaScript representation of whatever it is/whatever it evaluates to.
            :(showjs(io, tojs($(esc(x)))))
       end
   end

   :(JSString(sprint(io->(begin; $(writes...) end))))
end

Base.string(s::JSString) = s.s
Base.:(==)(x::JSString, y::JSString) = x.s==y.s

JSON.lower(x::JSString) = JSON.lower(x.s)

const JSONContext = JSON.Writer.StructuralContext
const JSONSerialization = JSON.Serializations.CommonSerialization

struct JSEvalSerialization <: JSONSerialization end

const verbose_json = Ref(false)

# adapted (very slightly) from JSON.jl test/serializer.jl
function JSON.show_json(io::JSONContext, ::JSEvalSerialization, x::JSString)
    if verbose_json[]
        first = true
        for line in split(x.s, '\n')
            !first && JSON.indent(io)
            first = false
            Base.print(io, line)
        end
    else
        Base.print(io, x.s)
    end
end
