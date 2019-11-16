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

## Installing Node

### Install NodeJS.jl
If the above failed to correct the problem. The issue may be with Node. To fix the issue, you can try

```julia
]add NodeJS
]build NodeJS
```
Typically, the `]build NodeJS` can be omitted. However, you may have previously added NodeJS.jl and it just needs to be rebuilt.

### Install external Nodejs
If the above still doesn't fix the issue, you can try to install an external version of [Nodejs](https://nodejs.org/en/), and ensure that the `node` executable (node.exe on Windows) in available on the path. 

#### For Windows Users
If you have trouble finding node.exe, you may wish to install the free tool [Everything](https://www.voidtools.com/) to find where your node.exe is located.

## Still having problems?
Open a [GitHub issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
Please make sure to include information about what you've tried and what the
results of those steps were.
