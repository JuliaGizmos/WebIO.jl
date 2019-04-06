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
iframe(content) = Scope()(node(IFrame(
    stringmime("text/html", content),
    string(WebIO.baseurl[], iframe_bundle_key()),
)))
