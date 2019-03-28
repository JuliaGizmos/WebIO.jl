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
        print("WebIO config in ~/.jupyter/jupyter_notebook_config.py but WebIO plugin not found")
    $END_MARKER
    """
    write(config_file, config_str)
    config_file_json = joinpath(homedir(), ".jupyter", "jupyter_notebook_config.json")

    if isfile(config_file_json)
        dict = try
            JSON.parse(read(config_file_json, String))
        catch err
            println(stderr, "Error parsing Jupyter config file $config_file_json - fix it and build again or delete it to enable WebIO")
            @goto jsondone
        end
        app = Base.@get! dict "NotebookApp" Dict()
        nbext = Base.@get! app "nbserver_extensions" Dict()
        nbext["jlstaticserve"] = true
        open(config_file_json, "w") do io
            prettyio = JSON.Writer.PrettyContext(io, 4)
            JSON.print(prettyio, dict)
        end
    end
    @label jsondone
end

function get_jupyter_datadir()
    try
        return readline(open(`jupyter --data-dir`))
    catch (e)
        # Is there a way to use Conda.jl if it's installed?
        @warn "Didn't detect Jupyter."
    end

    # Try guessing based on OS
    # https://jupyter.readthedocs.io/en/latest/projects/jupyter-directories.html
    if Sys.iswindows()
        # Is this right?
        return joinpath(homedir(), "%APPDATA%", "jupyter")
    elseif Sys.isapple()
        return joinpath(homedir(), "Library", "Jupyter")
    else
        # Maybe need to check XDG_DATA_HOME environment variable?
        return joinpath(homedir(), ".local", "share", "jupyter")
    end
end

"""
Install the Jupyter WebIO notebook extension.
"""
function install_webio_nbextension()
    extension_dir = joinpath(get_jupyter_datadir(), "nbextensions")
    mkpath(extension_dir)

    # I think the config dir is always ~/.jupyter, even on Windows.
    config_dir = joinpath(homedir(), ".jupyter", "nbconfig")
    mkpath(config_dir)
    config_file_json = joinpath(config_dir, "notebook.json")

    # Copy the nbextension files.
    @info "Copying WebIO nbextension files to $(extension_dir)."
    cp(
        joinpath(@__DIR__, "../packages/jupyter-notebook-provider/dist"),
        joinpath(extension_dir, "webio"),
        ; force=true
    )

    # Enable the notebook extension.
    config_data = Dict()
    if isfile(config_file_json)
        config_data = try
            JSON.parse(read(config_file_json, String))
        catch err
            println(stderr, "Error parsing Jupyter config file $config_file_json - fix it and build again or delete it to enable WebIO")
            return
        end
    end
    config_data["load_extensions"] = get(config_data, "load_extensions", Dict())
    config_data["load_extensions"]["webio/main"] = true
    open(config_file_json, "w") do io
        prettyio = JSON.Writer.PrettyContext(io, 4)
        JSON.print(prettyio, config_data)
    end
end

install_ijulia_config()
install_webio_nbextension()
