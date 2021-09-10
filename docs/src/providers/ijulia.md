# IJulia (Jupyter)

## Jupyter installation

Jupyter Notebook and JupyterLab integration is provided via the
`webio_jupyter_extension` package which is distributed on PyPI (the Python
package repository) since JupyterLab makes heavy use of the Python ecosystem.

From a system terminal (not the Julia command line), run:

```sh
python3 -m pip install --upgrade webio_jupyter_extension
```

**Note:** Since the WebIO Jupyter extension is distributed separately from the
WebIO Julia package, you may occasionally have to upgrade the WebIO extension
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
Conda.pip("install", "webio_jupyter_extension")
```

### Uninstall

From a system terminal (not the Julia command line), run:

```sh
python3 -m pip uninstall webio_jupyter_extension
```

## Troubleshooting

### The `webio_jupyter_extension` is installed but not working

Make sure you've installed the `webio_jupyter_extension` package in the same
Python or Conda environment that you're using to launch Jupyter.

You can ensure that you're using the same environment by installing the
extension and launching Jupyter like so:

```
python3 -m pip install webio_jupyter_extension
python3 -m jupyterlab
```

## Still having problems?

Open a [GitHub issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
Please make sure to include information about what you've tried and what the
results of those steps were.
