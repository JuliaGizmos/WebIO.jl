_error() = error(
    "The WebIO Jupyter extension must be installed using Python or Conda. " *
    "See https://juliagizmos.github.io/WebIO.jl/latest/providers/ijulia/ for more information."
)


find_jupyter_cmd(args...; kwargs...) = _error()
find_condajl_jupyter_cmd(args...; kwargs...) = _error()
install_jupyter_labextension(args...; kwargs...) = _error()
install_jupyter_nbextension(args...; kwargs...) = _error()
install_jupyter_serverextension(args...; kwargs...) = _error()
