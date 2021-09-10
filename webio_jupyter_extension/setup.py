"""
webio_jupyter_extension setup
"""
import json
import sys
from pathlib import Path

import setuptools

HERE = Path(__file__).parent.resolve()

# The name of the project
name = "webio_jupyter_extension"

lab_path = (HERE / name.replace("-", "_") / "labextension")
nbextension_path = (HERE / name.replace("-", "_") / "nbextension")

# Representative files that should exist after a successful build
ensured_targets = [
    str(lab_path / "package.json"),
    str(lab_path / "static/style.js")
]

# Get the package info from package.json
pkg_json = json.loads((HERE / "package.json").read_bytes())
labext_name = pkg_json["name"]

data_files_spec = [
    # labextension files
    (f"share/jupyter/labextensions/{labext_name}", str("."), "install.json"),
    (f"share/jupyter/labextensions/{labext_name}", str(lab_path.relative_to(HERE)), "**"),

    # nbextension files
    ('share/jupyter/nbextensions/webio-jupyter-nbextension', str(nbextension_path.relative_to(HERE)), '**'),
    ('etc/jupyter/nbconfig/notebook.d' , "jupyter-config/notebook-config", 'webio-jupyter-nbextension.json'),

    # serverextension files
    ("etc/jupyter/jupyter_server_config.d", "jupyter-config/server-config", f"{name}.json"),
    # For backward compatibility with notebook server
    ("etc/jupyter/jupyter_notebook_config.d", "jupyter-config/nb-config", f"{name}.json"),
]

long_description = (HERE / "README.md").read_text()


setup_args = dict(
    name=name,
    version=pkg_json["version"],
    description=pkg_json["description"],
    license=pkg_json["license"],
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    install_requires=[],
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.6",
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
        "Framework :: Jupyter :: JupyterLab",
        "Framework :: Jupyter :: JupyterLab :: 3",
        "Framework :: Jupyter :: JupyterLab :: Extensions",
        "Framework :: Jupyter :: JupyterLab :: Extensions :: Prebuilt",
    ],
)

try:
    from jupyter_packaging import (
        wrap_installers,
        npm_builder,
        get_data_files
    )
    post_develop = npm_builder(
        build_cmd="install:extension", source_dir="src", build_dir=lab_path
    )
    setup_args["cmdclass"] = wrap_installers(post_develop=post_develop, ensured_targets=ensured_targets)
    setup_args["data_files"] = get_data_files(data_files_spec)
except ImportError as e:
    import logging
    logging.basicConfig(format="%(levelname)s: %(message)s")
    logging.warning("Build tool `jupyter-packaging` is missing. Install it with pip or conda.")
    if not ("--name" in sys.argv or "--version" in sys.argv):
        raise e

if __name__ == "__main__":
    setuptools.setup(**setup_args)
