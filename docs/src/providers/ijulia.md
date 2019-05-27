# IJulia

## Troubleshooting
WebIO does its best, during the build process, to find the correct directories
to install the relevant Jupyter files to, but sometimes we don't succeed
(frequently due to having multiple Jupyter's on your system).

### Reinstalling the JupyterLab Extension
Try running the following at the Julia REPL.
The use of `IJulia.find_jupyter_subcommand` will use the Jupyter from your
`PATH`, or, if none exists, it will use the Jupyter that is installed in via
Conda.jl.

```julia
using IJulia, WebIO
labextension = IJulia.find_jupyter_subcommand("labextension")
run(`$labextension install @webio/jupyter-lab-provider@$(WebIO.VERSION)`)
```
