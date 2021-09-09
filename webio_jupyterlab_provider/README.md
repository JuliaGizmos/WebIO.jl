# webio_jupyterlab_provider

## Requirements

* JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install webio_jupyterlab_provider
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall webio_jupyterlab_provider
```


## Contributing

### Differences from typical Jupyter
Because *reasons*, we actually differ from the normal Jupyter labextension cookiecutter.
Namely, we actually have a pre-build process before we pass it off to the rest of the
Jupyterlab installation process. The reason we do this is that we need some special
webpack configuration to deal with SystemJS (which we use to load custom JS/CSS resources
at runtime) and that custom webpack configuration is hard to do within the Jupyter
labextension tooling.

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the webio_jupyterlab_provider directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall webio_jupyterlab_provider
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `webio-jupyterlab-provider` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
