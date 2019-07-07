using JSON

include("./bundlepaths.jl")
include("./jupyter.jl")

download_js_bundles()
install_jupyter_nbextension()
try
    install_jupyter_labextension()
catch exc
    @warn(
        "Unable to install Jupyter Lab extension; make sure jupyter is in your "
        * "PATH and rebuild WebIO if you want to use Jupyter Lab.",
        exception=exc,
    )
end
