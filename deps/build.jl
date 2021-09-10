using JSON

include("./bundlepaths.jl")
include("./jupyter.jl")

download_js_bundles()

const CONFIG_BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const CONFIG_END_MARKER = "###JULIA-WEBIO-CONFIG-END"

macro meh(expr)
    quote
        try
            $(esc(expr))
        catch exc
            @info "Surpressed exception (this is probably harmless)" expr=$(string(expr)) exception=exc
        end
    end
end

try
    @info "Attempting to uninstall old Jupyter integrations (it's probably okay if error messages appear below this point)"
    jupyter_config_dir = get(ENV, "JUPYTER_CONFIG_DIR", joinpath(homedir(), ".jupyter"))
    
    config_file_py = joinpath(jupyter_config_dir, "jupyter_notebook_config.py")
    if isfile(config_file_py)
        config_regex = Regex(
            "\n?" * CONFIG_BEGIN_MARKER * ".*" * CONFIG_END_MARKER * "\n?",
            "s",
        )
        config_py = read(config_file_py, String)
        config_py = replace(config_py, config_regex => "")
        write(config_file_py, config_py)
    end

    config_file_json = joinpath(jupyter_config_dir, "jupyter_notebook_config.json")
    if isfile(config_file_json)
        config_json = JSON.parse(read(config_file_json, String))
        @meh delete!(config_json["NotebookApp"]["nbserver_extensions"], "jlstaticserve")
        write(config_file_json, JSON.json(config_json, 4))
    end

    notebook_config_json = joinpath(jupyter_config_dir, "nbconfig", "notebook.json")
    if isfile(notebook_config_json)
        config_json = JSON.parse(read(notebook_config_json, String))
        @meh delete!(config_json["load_extensions"], "webio-jupyter-notebook")
        write(notebook_config_json, JSON.json(config_json, 4))
    end

    # try to uninstall labextension using system Jupyter installation
    @meh run(`jupyter labextension uninstall @webio/jupyter-lab-provider`)
    
    # try to uninstall labextension using Conda Jupyter installation
    conda_root = joinpath(first(Base.DEPOT_PATH), "conda", "3")
    conda_py = normpath(joinpath(conda_root, @static(
        Sys.iswindows()
        ? joinpath("Scripts", "python.exe")
        : joinpath("bin", "python")
    )))
    @meh run(`$conda_py -m jupyterlab.labextensions uninstall @webio/jupyter-lab-provider`)
catch exc
    # pass
    @warn "Error while updating Jupyter config" exception=exc
end
