using JSON

const BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const END_MARKER = "###JULIA-WEBIO-CONFIG-END"
function install_ijulia_config()
    config_file = joinpath(ENV["HOME"], ".jupyter", "jupyter_notebook_config.py")
    config_str = String(read(config_file))

    # remove previous config
    config_str = replace(config_str, Regex("\n" * BEGIN_MARKER * ".*" * END_MARKER, "s"), "")

    loadpath = JSON.json(vcat(Pkg.dir(), LOAD_PATH))
    config_str *= """
    $BEGIN_MARKER
    import sys
    sys.path.append("$(dirname(@__FILE__))")
    c = get_config()
    c.NotebookApp.nbserver_extensions = {
        "jlstaticserve": True
    }
    $END_MARKER
    """
    write(config_file, config_str)
    write("load_paths.json", loadpath)
end

install_ijulia_config()
