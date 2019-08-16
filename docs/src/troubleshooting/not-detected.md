# WebIO Not Detected

You may see this message in your frontend if WebIO is unable to find the active
WebIO instance in the browser.

## Troubleshooting Jupyter
This occurs most often when running in Jupyter when the frontend extensions
aren't installed correctly. Please check the [IJulia](@ref) documentation for
information about installing the frontend extensions. If you still have issues,
(after running the appropriate `WebIO.install_jupyter_XXXextension()` function
and refreshing the browser), keep reading.

Before continuing, make sure the correct Jupyter is the first `jupyter` in your
`PATH`.

### Jupyter Notebook
List all extensions by running
```sh
jupyter nbextension list
```
and uninstalling anything that includes `webio` (in particular, `webio/main`
refers to a previous version of the WebIO extension).

For example,
```sh
jupyter nbextension uninstall --user webio/main
jupyter nbextension uninstall --user webio-jupyter-notebook
```
(note that this may error if you don't actually have those extensions installed
and that's okay).

Re-install the Jupyter notebook extension by running (at the Julia REPL)
```julia
using WebIO
WebIO.install_jupyter_nbextension()
```

### Jupyter Lab
Re-install the Jupyter labextension by running (at the Julia REPL)
```julia
using WebIO
WebIO.install_jupyter_labextension()
```

Note that JupyterLab has more pitfalls relating to which `jupyter` executable
is in the path. Make sure that the Jupyter you're using (you can determine this
by running `which jupyter`) is the Jupyter that you expect.

## Still having problems?
Open a [GitHub issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
Please make sure to include information about what you've tried and what the
results of those steps were.
