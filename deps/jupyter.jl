if !(@isdefined BUNDLES_PATH)
    include("./bundlepaths.jl")
end

const CONFIG_BEGIN_MARKER = "###JULIA-WEBIO-CONFIG-BEGIN"
const CONFIG_END_MARKER = "###JULIA-WEBIO-CONFIG-END"

_tryrun(args...; kwargs...) = try run(args...; kwargs...) catch nothing end

"""
    install_notebook_config()

Install necessary configuration for the `jlstaticserve` notebook (server)
extension. This function only configures the notebook extension, not the browser
nbextension or Jupyter Lab extension.
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
function install_jupyter_serverextension()
    config_dir = jupyter_config_dir()
    mkpath(config_dir)
    config_file_py = joinpath(config_dir, "jupyter_notebook_config.py")
    config_py = isfile(config_file_py) ? read(config_file_py, String) : ""

    # Remove previous config
    config_regex = Regex(
        "\n?" * CONFIG_BEGIN_MARKER * ".*" * CONFIG_END_MARKER * "\n?",
        "s",
    )
    config_py = replace(config_py, config_regex => "")

    # We do a repr to make sure that all the necessary characters are escaped
    # and the whole path is wrapped in quotes.
    deps_dir = dirname(@__FILE__)
    deps_dir_esc = repr(deps_dir)
    error_msg = strip("""
        Directory $deps_dir could not be found; WebIO will not work as expected.
        """)
    config_py *= """

    $CONFIG_BEGIN_MARKER
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
    $CONFIG_END_MARKER
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
    find_jupyter_cmd()

Find the most likely candidate for the `jupyter` executable.
This will locate `jupyter` by searching the `PATH` environment variable and,
if not found, tries to return Conda.jl's jupyter.
If both of these approaches fail, an error is thrown.
"""
function find_jupyter_cmd(; force_conda_jupyter::Bool=false)::Cmd
    # Try to find the "system" Jupyter (unless we explicitly want to force
    # using IJulia's Jupyter installation).
    if !force_conda_jupyter
        jupyter = Sys.which("jupyter")
        if jupyter !== nothing
            return `$jupyter`
        end
    end

    # Try to find IJulia/Conda.jl's Jupyter.
    # This is a heuristic - it might be different. I'm not sure that there's
    # an easy way to load Conda.jl (I tried adding it to extras but no dice).
    conda_root = joinpath(first(Base.DEPOT_PATH), "conda", "3")
    jupyter = joinpath(conda_root, "bin", "jupyter")
    if isfile(jupyter)
        return `$jupyter`
    end
    @error(
        "Unable to find a jupyter executable after searching PATH and Conda.jl.",
        PATH=ENV["PATH"], conda_root,
    )
    error("Could not find the Jupyter executable.")
end

"""
    install_jupyter_labextension([jupyter]; force_conda_jupyter=false)

Install the Jupyter Lab extension for WebIO using the specified `jupyter`
executable.
The executable defaults to the first one found in the `PATH` or Jupyter
installed via IJulia/Conda.jl.
To force using Conda.jl's jupyter, specify the `force_conda_jupyter=true`
keyword; this might be necessary if you launch Jupyter via IJulia in the Julia
REPL.

The [IJulia provider documentation](https://juliagizmos.github.io/WebIO.jl/latest/providers/ijulia/)
provides some more information (and caveats) about the relationship between
Jupyter Lab and WebIO.
"""
function install_jupyter_labextension(
        jupyter::Union{Nothing, Cmd}=nothing;
        force_conda_jupyter::Bool=false,
        dev::Bool=isdev()
)
    if jupyter === nothing
        jupyter = find_jupyter_cmd(; force_conda_jupyter=force_conda_jupyter)
        @info(
            "Using default Jupyter executable at $jupyter; to use a different "
            * "executable, see the documentation by running "
            * "`?WebIO.install_jupyter_labextension`."
        )
    end
    install_jupyter_serverextension()

    _tryrun(`$jupyter labextension unlink --no-build @webio/webio`)
    _tryrun(`$jupyter labextension uninstall --no-build @webio/jupyter-lab-provider`)

    if dev
        @info "Installing Jupyter labextension in dev mode..."
        core_path = joinpath(PACKAGES_PATH, "webio")
        lab_provider_path = joinpath(PACKAGES_PATH, "jupyter-lab-provider")
        run(`$jupyter labextension link --no-build $core_path`)
        run(`$jupyter labextension install --no-build $lab_provider_path`)
    else
        run(`$jupyter labextension install --no-build @webio/jupyter-lab-provider@$(WEBIO_VERSION)`)
    end
    run(`$jupyter lab build`)
end


"""
    install_webio_nbextension([jupyter])

Install the Jupyter Notebook extension (nbextension) for WebIO.
This copies the nbextension code to the appropriate place and writes the
appropriate configuration files.
"""
function install_jupyter_nbextension(
        jupyter::Cmd=find_jupyter_cmd();
        nbextension_flags::Cmd=`--user`,
)
    install_jupyter_serverextension()

    # Copy the nbextension files.
    install_cmd = `$jupyter nbextension install $nbextension_flags $JUPYTER_NBEXTENSION_PATH`
    @info "Installing Jupyter WebIO extension..." cmd=install_cmd
    run(install_cmd)

    enable_cmd = `$jupyter nbextension enable $nbextension_flags $JUPYTER_NBEXTENSION_NAME`
    @info "Enabling Jupyter WebIO extension..." cmd=enable_cmd
    run(enable_cmd)

    return nothing
end

### BEGIN BORROWED CODE ###
# This code is adapted from IJulia.jl (MIT license).
# https://github.com/JuliaLang/IJulia.jl/blob/68748c2b88b4b394e2802e911eb154b7008ebdd2/deps/kspec.jl
@static if Sys.iswindows()
    function appdata() # return %APPDATA%
        path = zeros(UInt16, 300)
        CSIDL_APPDATA = 0x001a
        result = ccall((:SHGetFolderPathW,:shell32), stdcall, Cint,
            (Ptr{Cvoid},Cint,Ptr{Cvoid},Cint,Ptr{UInt16}),C_NULL,CSIDL_APPDATA,C_NULL,0,path)
        return result == 0 ? transcode(String, resize!(path, findfirst(iszero, path)-1)) : get(ENV, "APPDATA", "")
    end
    function default_jupyter_data_dir()
        APPDATA = appdata()
        return !isempty(APPDATA) ? joinpath(APPDATA, "jupyter") : joinpath(get(ENV, "JUPYTER_CONFIG_DIR", joinpath(homedir(), ".jupyter")), "data")
    end
elseif Sys.isapple()
    default_jupyter_data_dir() = joinpath(homedir(), "Library/Jupyter")
else
    function default_jupyter_data_dir()
        xdg_data_home = get(ENV, "XDG_DATA_HOME", "")
        data_home = !isempty(xdg_data_home) ? xdg_data_home : joinpath(homedir(), ".local", "share")
        joinpath(data_home, "jupyter")
    end
end

function jupyter_data_dir()
    env_data_dir = get(ENV, "JUPYTER_DATA_DIR", "")
    !isempty(env_data_dir) ? env_data_dir : default_jupyter_data_dir()
end
### END BORROWED CODE ###

function jupyter_config_dir()
    env_config_dir = get(ENV, "JUPYTER_CONFIG_DIR", "")
    !isempty(env_config_dir) ? env_config_dir : joinpath(homedir(), ".jupyter")
end
jupyter_nbextensions_dir() = joinpath(jupyter_data_dir(), "nbextensions")
jupyter_nbconfig_dir() = joinpath(jupyter_config_dir(), "nbconfig")
