using JSON

include("./bundlepaths.jl")
include("./jupyter.jl")

download_js_bundles()

# See https://github.com/JuliaGizmos/WebIO.jl/issues/314 for the rational behind
# why we're not installing Jupyter packages by default anymore.
@warn(
    "WebIO no longer Jupyter extensions automatically; please run "
    * "`WebIO.install_jupyter_notebook()` or `WebIO.install_jupyter_lab()` if "
    * "needed."
)
