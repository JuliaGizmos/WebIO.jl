# IJulia (Jupyter)

## JupyterLab installation

JupyterLab integration is provided via the `webio_jupyterlab_provider` package
which is distributed on PyPI (the Python package repository) since JupyterLab
makes heavy use of the Python ecosystem.

From a system terminal (not the Julia command line), run

```sh
python3 -m pip install --upgrade webio_jupyterlab_provider
```

**Note:** Since the WebIO labextension is distributed separately from the WebIO
Julia package, you may occasionally have to upgrade the WebIO labextension
separately using the same command as above.

### Install using Conda.jl

If using Conda.jl, the extension must be installed within the appropriate Conda
environment. This might be required if you launch Jupyter via the
`IJulia.notebook()` or `IJulia.jupyterlab()` commands (only if you don't have
Jupyter installed on your system outside of IJulia).

```julia
# within a Julia REPL
using Conda
Conda.pip_interop(true)
Conda.pip("install", "webio_jupyterlab_provider")
```

### Uninstall

From a system terminal (not the Julia command line), run

```
python3 -m pip uninstall webio_jupyterlab_provider
```

### Troubleshooting

#### Uninstall previous versions

If you launch Jupyter by running `IJulia.jupyterlab()`, run the following
instead.

```julia
using WebIO
WebIO.install_jupyter_labextension(condajl=true)
```

### Jupyter Hub

The Jupyter server extension needs to be installed as part of the build
process - before the `jupyter–notebook` starts. This means that it's not
possible to install WebIO while running in JupyterHub since you can't restart
the notebook process.

For example, if running JupyterHub using docker containers (e.g., using the
Kubernetes spawner), add this step to your singleuser image:

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
