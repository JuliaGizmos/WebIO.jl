# Integration with JSExpr

"""
A JSAST node that represents an observable.

This is necessary so that we can access the actual observable during deparse
(instead of only a JSAST node with lowered JSON corresponding to the
observable).

To this end, we overload `interpolate` to return a `_ObservableJSNode` whenever
we interpolate Observables. This also has the side effect of making
interpolating observables without dereferencing them an error, which is probably
a good thing (otherwise people might think that interpolating an Observable will
yield its current value).
"""
struct _ObservableJSNode <: JSExpr.JSNode
    obs::AbstractObservable
end
JSExpr.interpolate(obs::AbstractObservable) = _ObservableJSNode(obs)

"""
A JSAST node that represents an observable dereference.

This needs to have its own node type so that we can specialize the deparse for
`=` when we're dereferencing an Observable. This allows us to call the
appropriate frontend method to set the value of the Observable (i.e., we need
`WebIO.setval(..., newValue)` instead of `WebIO.getval(...) = newVal`).
"""
struct _ObservableDerefJSNode <: JSExpr.JSNode
    obs::AbstractObservable
end
JSExpr.dereference(obs_node::_ObservableJSNode) = _ObservableDerefJSNode(obs_node.obs)

function JSExpr.deparse(::_ObservableJSNode)
    error(
        "Cannot implicitly convert observable in JSExpr " *
        "(did you mean to dereference the observable?)."
    )
end

function JSExpr.deparse(obs_deref::_ObservableDerefJSNode)
    obs_info = _obs_info(obs_deref.obs)
    return js"WebIO.getval($obs_info)"
end

# Specialize assignment when LHS is an observable (see documentation for
# `_ObservableDerefJSNode`).
function JSExpr.deparse(::Val{:(=)}, obs_deref::_ObservableDerefJSNode, rhs)
    obs_info = _obs_info(obs_deref.obs)
    return js"WebIO.setval($obs_info, $(JSExpr.deparse(rhs)))"
end

function _obs_info(obs::AbstractObservable)
    if !haskey(WebIO.observ_id_dict, obs)
        error("No scope associated with observable being interpolated")
    end
    scope_weakref, name = WebIO.observ_id_dict[obs]
    scope = scope_weakref.value
    if scope === nothing
        error("The scope of the observable being interpolated no longer exists.")
    end
    return Dict(
        "type" => "observable",
        "scope" => WebIO.scopeid(scope),
        "name" => name,
        "id" => WebIO.obsid(obs),
    )
end
