export ObservableRef, on, onany

"""
Like a `Ref` but updates can be watched by adding a
handler to `on`.

# Example:

```julia
x = ObservableRef(0)

# handle changes:
on(println, x)

# set the value:
x[] = 2

# get the value:
x[]
```
"""
type ObservableRef{T}
    val::T
end

const listeners = WeakKeyDict()

function on(f, ob::ObservableRef)
    fs = if haskey(listeners, ob)
        listeners[ob]
    else
        listeners[ob] = []
    end
    push!(fs, f)
    nothing
end

function Base.setindex!(ob::ObservableRef, val)
    ob.val = val
    for f in get(listeners, ob, ())
        f(val)
    end
end

Base.getindex(ob::ObservableRef) = ob.val


### Utilities

_val(x::ObservableRef) = x[]
_val(x) = x

function onany(f, objs...)
    observs = filter(x->isa(x, ObservableRef), objs)
    g(_) = f(map(_val, objs)...)
    for o in observs
        on(g, o)
    end
end

function Base.map!(f, ob::ObservableRef, obs...)
    onany(obs...) do val...
        ob[] = f(val...)
    end
    ob
end

function Base.map(f, ob::ObservableRef, obs...; init=f(ob[], map(_val, obs)...))
    map!(f, ObservableRef(init), ob, obs...)
end

# TODO: overload broadcast on v0.6
