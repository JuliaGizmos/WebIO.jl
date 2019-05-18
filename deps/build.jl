using JSON

include("./jupyterdirs.jl")

const BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const END_MARKER = "###JULIA-WEBIO-CONFIG-END"
function install_notebook_config()
    config_dir = jupyter_config_dir()
    mkpath(config_dir)
    config_file = joinpath(config_dir, "jupyter_notebook_config.py")
    config_str = isfile(config_file) ? read(config_file, String) : ""

    # remove previous config
    config_str = replace(config_str, Regex("\n?" * BEGIN_MARKER * ".*" * END_MARKER * "\n?", "s") => "")

    config_str *= """

    $BEGIN_MARKER
    import sys, os
    if os.path.isfile($(repr(joinpath(dirname(@__FILE__), "jlstaticserve.py")))):
        sys.path.append($(repr(dirname(@__FILE__))))
        c = get_config()
        c.NotebookApp.nbserver_extensions = {
            "jlstaticserve": True
        }
    else:
        print("WebIO config in " + $(repr(config_file)) + " but WebIO plugin not found")
    $END_MARKER
    """
    write(config_file, config_str)
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
