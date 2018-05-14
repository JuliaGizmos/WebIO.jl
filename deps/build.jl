using JSON

const BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const END_MARKER = "###JULIA-WEBIO-CONFIG-END"
function install_ijulia_config()
    config_file = joinpath(homedir(), ".jupyter", "jupyter_notebook_config.py")
    if isfile(config_file)
        config_str = String(read(config_file))
    else
        mkpath(dirname(config_file))
        config_str = ""
    end

    # remove previous config
    config_str = replace(config_str, Regex("\n?" * BEGIN_MARKER * ".*" * END_MARKER * "\n?", "s"), "")

    loadpath = JSON.json(vcat(Pkg.dir(), LOAD_PATH))
    config_str *= """

    $BEGIN_MARKER
    import sys, os
    if os.path.isfile("$(joinpath(dirname(@__FILE__), "jlstaticserve.py"))"):
        sys.path.append("$(dirname(@__FILE__))")
        c = get_config()
        c.NotebookApp.nbserver_extensions = {
            "jlstaticserve": True
        }
    else:
        print("WebIO config in ~/.jupyter/jupyter_notebook_config.py but WebIO plugin not found")
    $END_MARKER
    """
    write(config_file, config_str)
    write("load_paths.json", loadpath)
end

install_ijulia_config()
