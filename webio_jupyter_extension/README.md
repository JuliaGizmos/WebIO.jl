# webio_jupyter_extension

## Requirements

* JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install webio_jupyter_extension
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall webio_jupyter_extension
```


## Contributing

## How installing the server/labextension components works

tl;dr: We define some `data_files` in the `setup.py` that places the relavent server and labextension files in the right place. This means it's also automatically cleaned up when uninstalled.

### Differences from typical Jupyter
Because *reasons*, we actually differ from the normal Jupyter labextension cookiecutter.
Namely, we actually have a pre-build process before we pass it off to the rest of the
Jupyterlab installation process. The reason we do this is that we need some special
webpack configuration to deal with SystemJS (which we use to load custom JS/CSS resources
at runtime) and that custom webpack configuration is hard to do within the Jupyter
labextension tooling.

### Development install

Note: You will need NodeJS to build the extension package.

```bash
# Clone the repo to your local environment
# Change directory to the webio_jupyter_extension directory
# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Server extension must be manually installed in develop mode
jupyter server extension enable webio_jupyter_extension.serverextension

# Rebuild extension Typescript source after making changes
yarn build
```

By default, the `yarn build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
jupyter server extension disable webio_jupyter_extension.serverextension
pip uninstall webio_jupyter_extension
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `webio-jupyter-labextension` within that folder.
