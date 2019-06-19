# Render

The [`WebIO.render`](@ref) function is the primary method of extending WebIO and providing interoperability between WebIO and other libraries.
For example, one could define a custom method to render a `MyPlot` type.
See the [Extending WebIO](@ref) documentation for more information.

## Internal API
```@docs
WebIO.@register_renderable
WebIO.register_renderable
WebIO.render
```

## Private API
```@docs
WebIO.observable_to_scope
```
