# WebIO Not Detected

You may see this message in your frontend if WebIO is unable to find the active
WebIO instance in the browser.

## Troubleshooting Jupyter
WebIO requires the installation of a Jupyter extension to function properly.

If you're using Jupyter Notebook (classic), run the following.
```julia
using WebIO
WebIO.install_jupyter_nbextension()
```

If you're using Jupyter Lab, run the following.
```julia
using WebIO
WebIO.install_jupyter_labextension()

# Or, if you are launching via IJulia.jupyterlab()
using WebIO
WebIO.install_jupyter_labextension(condajl=true)
```

Jupyter Lab poses some additional issues that the classic notebook does not.
For more information on those difficulties, read the [IJulia](@ref)
documentation.

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
(note that this may print an error if you don't actually have those extensions
installed and that's okay).

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

If you launch Jupyter by running `IJulia.jupyterlab()`, run the following
instead.
```julia
using WebIO
WebIO.install_jupyter_labextension(condajl=true)
```

### Jupyter Hub

The Jupyter server extension needs to be installed as part of the build process - before the `jupyter–notebook` starts.
This means that it's not possible to install WebIO while running in JupyterHub since you can't restart the notebook process.

For example, if running JupyterHub using docker containers (e.g., using the Kubernetes spawner), add this step to your singleuser image:

```
RUN julia -e '\
        using Pkg; pkg"add IJulia WebIO"; pkg"precompile"; \
        using WebIO; WebIO.install_jupyter_nbextension(); \
    '
```

If using JupyterLab, use `WebIO.install_jupyter_labextension()` instead.

## Still having problems?
Open a [GitHub issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
Please make sure to include information about what you've tried and what the
results of those steps were.
