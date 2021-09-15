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

First, check if the WebIO extension is properly installed:
```
# For classic notebook
jupyter nbextension list
# Should include in output:
#     notebook section
#       webio-jupyter-nbextension/nbextension  enabled 

# For Jupyter lab
jupyter labextension list
# Should include in output:
#     webio-jupyterlab-provider vX.Y.Z enabled OK (python, webio_jupyter_extension)
```

If the installation is **NOT** installed, continue reading for troubleshooting steps.

#### 1: Make sure to use same Python/Conda environment for both Jupyter and WebIO

Make sure you've installed the `webio_jupyter_extension` package in the same
Python or Conda environment that you're using to launch Jupyter.

You can ensure that you're using the same environment by installing the
extension and launching Jupyter like so:

```
python3 -m pip install webio_jupyter_extension
python3 -m jupyterlab
```

#### 2: Make sure to be consistent with `--user` pip installations
The WebIO extension will not be detected if Jupyter is intalled system-wide and
the WebIO extension is installed in your user installation (or vice-versa). Pip
might install into the per-user install directory if you use the `--user` flag OR
if you don't have permission to edit the global installation.pip 

You can determine if this is the case by inspecting where the packages are installed:
```sh
# replace "jupyterlab" with "notebook" for classic notebook
pip3 show jupyterlab | grep -i location
pip3 show webio_jupyter_extension | grep -i location
```

If this happens, the easiest solution is to uninstall and reinstall all relevant:
```
pip3 uninstall jupyter notebook jupyterlab webio_jupyter_extension

# If you want to install it on a per-user basis, omit the "sudo" and change
# "install" to "install --user"
sudo pip3 install jupyter notebook jupyterlab webio_jupyter_extension
```

**Alternatively:** This problem can be avoided using virtual environments:
```
# Create a new virtual environment (you only have to do this once!)
python3 -m venv venv

# Activate the virtual environment
. venv/bin/active

# Install Jupyter + WebIO extension (you only have to do this once!)
pip install notebook jupyterlab webio_jupyter_extension

# Launch jupyter
jupyter lab  # or jupyter notebook
```
If using virtual environments, you must always start Jupyter using a virtual
environment that has the WebIO extension installed.

## Still having problems?

Open a [GitHub issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
Please make sure to include information about what you've tried and what the
results of those steps were.
