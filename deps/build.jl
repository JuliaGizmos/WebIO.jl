using JSON

include("./jupyterdirs.jl")

const BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const END_MARKER = "###JULIA-WEBIO-CONFIG-END"
"""
    install_notebook_config()

Install necessary configuration for the `jlstaticserve` notebook (server)
extension. This function only configures the notebook extension, not browser
nbextension.
* Adds the path to `./deps` to Python's `sys.path` so that we can load the
    `jlstaticserve.py` extension. This is done in `jupyter_notebook_config.py`
    because there's no way to add to `sys.path` from the JSON config file.
* Adds `jlstaticserve` to the list of extensions loaded in the notebook server.
    This is done in `jupyter_notebook_config.json` because that file has higher
    precedence when both the `.py` and `.json` files exist (IPyWidgets, for
    example, writes to the JSON file, so if we only wrote to the `.py` file,
    that directive would take precedence and the `jlstaticserve` extension would
    **not** be loaded).
"""
function install_notebook_config()
    config_dir = jupyter_config_dir()
    mkpath(config_dir)
    config_file_py = joinpath(config_dir, "jupyter_notebook_config.py")
    config_py = isfile(config_file_py) ? read(config_file_py, String) : ""

    # Remove previous config
    config_py = replace(config_py, Regex("\n?" * BEGIN_MARKER * ".*" * END_MARKER * "\n?", "s") => "")

    # We do a repr to make sure that all the necessary characters are escaped
    # and the whole path is wrapped in quotes.
    deps_dir = dirname(@__FILE__)
    deps_dir_esc = repr(deps_dir)
    error_msg = strip("""
        Directory $deps_dir could not be found; WebIO will not work as
        """)
    config_py *= """

    $BEGIN_MARKER
    # Add the path to WebIO/deps so that we can load the `jlstaticserve` extension.
    import os, sys, warnings
    webio_deps_dir = $deps_dir_esc
    if os.path.isfile(os.path.join(webio_deps_dir, "jlstaticserve.py")):
        sys.path.append(webio_deps_dir)
    else:
        warning_msg = (
            'Directory %s could not be found; WebIO.jl will not work as expected. '
            + 'Make sure WebIO.jl is installed correctly (try running '
            + 'Pkg.add("WebIO") and Pkg.build("WebIO") from the Julia console to '
            + 'make sure it is).'
        ) % webio_deps_dir
        warnings.warn(warning_msg)
    $END_MARKER
    """

    config_file_json = joinpath(config_dir, "jupyter_notebook_config.json")
    config_json = isfile(config_file_json) ? read(config_file_json, String) : "{}"
    config_json = try
        JSON.parse(config_json)
    catch exc
        @error "Unable to parse Jupyter notebook config file ($config_file_json). Please fix it and rebuild WebIO." exception=exc
        rethrow()
    end

    # Magic to safely access nested JSON objects and set them to empty objects
    # if they don't exist yet.
    app_config = get!(config_json, "NotebookApp", Dict())
    extensions_config = get!(app_config, "nbserver_extensions", Dict())
    extensions_config["jlstaticserve"] = true

    # Defer writing until both files until the end to avoid inconsistent state.
    write(config_file_py, config_py)
    write(config_file_json, json(config_json, 4))
    return nothing
end

"""
Install the Jupyter WebIO notebook extension.
"""
function install_webio_nbextension()
    extensions_dir = jupyter_nbextensions_dir()
    mkpath(extensions_dir)
    extension_dir = joinpath(extensions_dir, "webio")

    # Copy the nbextension files.
    @info "Copying WebIO nbextension files to $(extension_dir)."
    cp(
        joinpath(@__DIR__, "../packages/jupyter-notebook-provider/dist"),
        extension_dir,
        ; force=true
    )

    # Enable the notebook extension.
    config_dir = jupyter_nbconfig_dir()
    mkpath(config_dir)
    config_file = joinpath(config_dir, "notebook.json")
    config_data = try
        isfile(config_file) ? JSON.parse(read(config_file, String)) : Dict()
    catch exc
        @error "Error parsing Jupyter config file $config_file - fix it and build again or delete it to enable WebIO." exception=exc
        error("Unable to parse Jupyter config file.")
    end
    config_data["load_extensions"] = get(config_data, "load_extensions", Dict())
    config_data["load_extensions"]["webio/main"] = true
    open(config_file, "w") do io
        JSON.print(JSON.Writer.PrettyContext(io, 4), config_data)
    end
end

install_notebook_config()
install_webio_nbextension()
