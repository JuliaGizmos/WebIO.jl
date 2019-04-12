export iframe

mutable struct IFrame
    innerHTML::AbstractString
    bundleURL::AbstractString
end

iframe_bundle_key() = AssetRegistry.register(normpath(joinpath(
    WebIO.packagepath, "generic-http-provider", "dist", "generic-http.js"
)))

"""
    iframe(content)

Wrap the content in an IFrame.

Content is typically a WebIO node, but may be anything with a `text/html` MIME
representation. The IFrame itself is wrapped in a scope to allow for mount
callbacks.
"""
function iframe(content)
    ifr = IFrame(
        stringmime("text/html", content),
        string(WebIO.baseurl[], iframe_bundle_key()),
    )
    # We wrap the IFrame in a div for historical reasons (notably, MeshCat.jl
    # tries to set attributes on the div when rendering its visualizer); this
    # is definitely an implementation detail but we can avoid breaking things
    # at any rate.
    dom = node(
        :div,
        node(ifr),
        style=Dict(
            :display => "inherit",
            :margin => "inherit",
        ),
    )
    return Scope(dom=dom)
end
