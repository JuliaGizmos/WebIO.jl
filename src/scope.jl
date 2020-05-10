using JSON

export Scope,
       @private,
       setobservable!,
       on, onjs,
       onmount,
       onimport,
       ondependencies,
       adddeps!,
       import!,
       scopeid

import Sockets: send
import Observables: Observable, AbstractObservable, listeners

"""
    StructObservableInfo(observable[; kwargs...])

Info about an `Observable` within a [`Scope`](@ref).

# Keyword Arguments
* `js_handlers` - An array of handlers that are invoked when the `Observable`
    is updated on the frontend.
* `private` - `true` if the `Observable` should not be sent to the frontend
    (this might be used to hold _computed_ information that does not need to be
    sent back to the frontend).
"""
struct ScopeObservableInfo
    observable::AbstractObservable
    js_handlers::Vector{AbstractString}
    private::Bool
end

function ScopeObservableInfo(
        observable::AbstractObservable,
        ;
        js_handlers::Vector{AbstractString} = [],
        private::Bool = false,
)
    return ScopeObservableInfo(observable, js_handlers, private)
end

"""
    Scope

A _package_ of `Observable`s bundled together with [`Asset`](@ref)s, a DOM
[`Node`](@ref), and JavaScript handlers.

# Fields
All fields are considered private to the `Scope` and may be changed without
warning or deprecation period.

* `dom` - The DOM [`Node`](@ref) that will be rendered when the scope is
    _mounted_ in the frontend.
* `imports` - A set of [`Asset`](@ref)s that are imported when the `Scope` is
    mounted on the frontend. These `Asset`s are available using `onimport!`
    handlers.
* `systemjs_options` - Options that are passed to SystemJS to configure import
    behavior. See the
    [SystemJS docs](https://github.com/systemjs/systemjs/blob/2d40444a3779d4e7f60fe0abcffed45c6767adaa/docs/config-api.md)
    for more information.
* `mount_callbacks` - A set of callbacks to invoke when the `Scope` is mounted
    for the first time (these are invoked _after_ imports have been loaded).
* `observables` - A `Dict` that maps observable ids to a `ScopeObservableInfo`
    object. Unless the `Observable` is marked as private, these `Observable`s
    are automatically setup to sync between the frontend and Julia.
* `observable_aliases` - A `Dict` that maps aliases (convenient names) to
    `Observables` within a given `Scope`. These aliases may be used by either
    Julia or JavaScript sides of things.
* `pool` - The [`ConnectionPool`](@ref) object for this `Scope`.
"""
mutable struct Scope
    dom::Any
    imports::Vector{Asset}
    systemjs_options::Any
    mount_callbacks::Vector{JSString}

    observables::Dict{String, ScopeObservableInfo}
    observable_aliases::Dict{String, AbstractObservable}
    pool::ConnectionPool

    # Internal constructor to ensure that we invoke `register_scope!`
    function Scope(
            dom,
            imports,
            systemjs_options,
            mount_callbacks,
    )
        scope = new(
            dom,
            imports,
            systemjs_options,
            mount_callbacks,
            Dict{String, ScopeObservableInfo}(),
            Dict{String, AbstractObservable}(),
            ConnectionPool(),
        )
        register_scope!(scope)
        return scope
    end
end

"""
    scopeid(scope)

Get a unique identifier for the specified scope.
This is the identifier that is used to reference scopes when communicating
between Julia and the Browser.
"""
# Note: We use the "s" prefix to avoid some common pitfalls where CSS parsing
# fails if the first character is a number.
# https://github.com/FluxML/Trebuchet.jl/commit/56115983a45c1a7232c11a30870c28860d2a7581
scopeid(scope::Scope) = string("s", objectid(scope))

connections(scope::Scope) = connections(scope.pool)

"""
    ScopeRefcount(scope::Scope[, ref_count::Int])

An WebIO-internal data structure used to keep track of scopes.

WebIO's internal machinery implements reference counting of scopes so that we
can _reap_ [`Scope`s](@ref Scope) that are no longer needed by any frontend.

We don't necessary reap scopes when all connections disconnect because the
disconnection may be transient. Instead, it is up to the frontend to notify
Julia when it is done with a scope and will never ask for it again (e.g.
because a cell is re-run and Scope unmounts).
"""
mutable struct ScopeRefcount
    scope::Scope
    refcount::Int
end
ScopeRefcount(scope::Scope) = ScopeRefcount(scope, 0)

const global_scope_refcounts = Dict{String, ScopeRefcount}()
const global_scope_weakrefs = Dict{String, WeakRef}()

function register_scope!(scope::Scope)
    id = scopeid(scope)
    global_scope_refcounts[id] = ScopeRefcount(scope)
    global_scope_weakrefs[id] = WeakRef(scope)
    finalizer(finalize_scope!, scope)
end

function incr_scope_refcount!(scopeid::String)
    ref = get(global_scope_weakrefs, scopeid, nothing)
    if ref === nothing
        error("Unable to increment refcount for unknown or reaped Scope: $(scopeid).")
    end

    scope::Union{Scope, Nothing} = ref.value
    if scope === nothing
        # Typically this shouldn't happen.
        delete!(global_scope_weakrefs, scopeid)
        error("Unable to increment refcount for already-reaped Scope: $(scopeid).")
    end

    incr_scope_refcount!(scope)
    scope_refcount = get!(
        () -> ScopeRefcount(scope),
        global_scope_refcounts,
        scopeid,
    )
    scope_refcount.refcount += 1

    return scope
end

function decr_scope_refcount!(scopeid::String)
    scope_refcount = get(global_scope_refcounts, scopeid, nothing)
    if scope_refcount === nothing
        error(
            "Unable to decrement refcount for unknown " *
            "(possibly already pre-reaped) Scope: $(scopeid)."
        )
    end

    scope_refcount.refcount -= 1
    if scope_refcount.refcount <= 0
        delete!(global_scope_refcounts, scopeid)
    end

    return nothing
end

function finalize_scope!(scope::Scope)
    id = scopeid(scope)
    delete!(global_scope_refcounts, id)
    delete!(global_scope_weakrefs, id)
end

"""
    lookup_scope(scopeid::String)

Lookup a [`Scope`](@ref) given its id.

This function returns the given scope or throws an error if the scope could not
be found (e.g., if an unknown id was given or the `Scope` itself was fully
reaped and garbage collected).
"""
function lookup_scope(scopeid::String)::Scope
    scope_weakref = get(global_scope_weakrefs, scopeid, nothing)
    if scope_weakref === nothing || scope_weakref.value === nothing
        error("Unable to lookup Scope: $(scopeid).")
    end
    return scope_weakref.value
end

"""
    Scope(<keyword arguments>)

An object which can send and receive messages.

# Arguments
- `dom`: The DOM node that will be rendered when the scope is displayed in the
    browser.
- `imports`: An collection of `Asset`s to load (see [`Asset`](@ref) for
    more documentation) when the scope is mounted. If the entry is not an
    `Asset` then it should be an argument to construct an `Asset`.

# Examples
```julia
myscope = Scope(
    dom=node(:p, "I'm a little scope!"),
    imports=[Asset("foo.js"), "bar.css", "spam" => "spam.js"],
)
```
"""
function Scope(;
        dom = dom"span"(),
        imports = Asset[],
        systemjs_options = nothing,
        mount_callbacks = String[]
)
    imports = Asset[Asset(i) for i in imports]
    pool = ConnectionPool()
    return Scope(
        dom,
        imports,
        systemjs_options,
        mount_callbacks,
    )
end

function (scope::Scope)(dom)
    scope.dom = dom
    return scope
end

Base.wait(scope::Scope) = Base.wait(scope.pool)

# TODO: This should go in a different file since it involved both the Scope and
# Observables abstraction and is more associated with rendering than the core
# functionality of Scopes.
function JSON.lower(scope::Scope)
    obs_dict = Dict()
    for (obs_id, obs_info) in scope.observables
        # We don't need to serialize information about private observables since
        # the frontends don't need to know about them.
        if obs_info.private
            continue
        end
        obs_dict[obs_id] = JSON.lower(obs_info)
    end

    obs_aliases = Dict()
    for (alias, observable) in scope.observable_aliases
        obs_aliases[alias] = obsid(observable)
    end

    return Dict(
        "id" => scopeid(scope),
        "imports" => lowerassets(scope.imports),
        "mountCallbacks" => scope.mount_callbacks,
        "observables" => obs_dict,
        "observableAliases" => obs_aliases,
        "systemjsOptions" => scope.systemjs_options,
    )
end

function JSON.lower(obs_info::ScopeObservableInfo)
    return Dict(
        "id" => obsid(obs_info.observable),
        "handlers" => obs_info.js_handlers,
    )
end

function render(s::Scope)
    node(s, s.dom)
end

"""
    send_command(scope, command[, "key" => "value", ...])

Send a command message for a scope. A command is essentially a fire-and-forget
style message; no response or acknowledgement is expected.
"""
function command(scope::Scope, command, args...)
    return command(scope.pool, command, args...)
end

function request(scope::Scope, args...; kwargs...)
    # TODO: Figure out how (and if) we want to support this.
    error("Sending requests to scopes is not supported.")
end

function onmount(scope::Scope, f::JSString)
    push!(scope.mount_callbacks, f)
    return scope
end

function onimport(scope::Scope, f::JSString)
    onmount(scope, js"""
        function () {
            var handler = ($(f));
            ($(Async(scope.imports))).then((imports) => handler.apply(this, imports));
        }
        """)
end

onmount(scope::Scope, f) = onmount(scope, JSString(f))
onimport(scope::Scope, f) = onimport(scope, JSString(f))

function handle_command(
        ::Val{:setup_scope},
        conn::AbstractConnection,
        data::Dict,
)
    scope = lookup_scope(data["scope"])
    add_connection!(scope.pool, conn)
end

function handle_command(
        ::Val{:teardown_scope},
        conn::AbstractConnection,
        data::Dict,
)
    decr_scope_refcount!(data["scopeId"])
end

function handle_command(
        ::Val{:update_observable},
        conn::AbstractConnection,
        data::Dict,
)
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    error("Not implemented!")
end

function onjs(scope::Scope, key::String, f::AbstractString)
    handlers = get(scope.observable_js_handlers, key, nothing)
    if handlers === nothing
        error("Cannot setup onjs handler for unknown Observable: $key.")
    end
    push!(handlers, f)
    return nothing
end

function onjs(scope::Scope, obs::AbstractObservable, f::AbstractString)
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    error("Not implemented!")
end

function offjs(ctx, key, f)
    if f in get(ctx.js_observable_handlers, key, [])
        keys = ctx.js_observable_handlers[key]
        deleteat!(keys, findall(in(f), keys))
    end
    nothing
end

function Base.show(io::IO, ::WEBIO_NODE_MIME, x::Scope)
    write(io, JSON.json(render(x)))
end
function Base.show(io::IO, m::MIME"text/html", x::Scope)
    show(io, m, render(x))
end

function _show(io::IO, el::Scope, indent_level=0)
    showindent(io, indent_level)
    _show(io, el.dom, indent_level)
end

# Adding assets to scopes
import!(scope::Scope, x) = push!(scope.imports, Asset(x))
