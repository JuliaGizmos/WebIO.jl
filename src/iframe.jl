export iframe

mutable struct IFrame
    innerHTML::AbstractString
    bundleURL::AbstractString
end

iframe_bundle_key() = AssetRegistry.register(normpath(joinpath(
    WebIO.packagepath, "generic-http-provider", "dist", "generic-http.js"
)))

iframe(content) = node(IFrame(
    stringmime("text/html", content),
    string(WebIO.baseurl[], iframe_bundle_key()),
))
