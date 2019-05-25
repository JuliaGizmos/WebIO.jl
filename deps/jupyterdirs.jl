# This code is "borrowed" from IJulia.jl (MIT license).
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

### End of borrowed code ###

function jupyter_config_dir()
    env_config_dir = get(ENV, "JUPYTER_CONFIG_DIR", "")
    !isempty(env_config_dir) ? env_config_dir : joinpath(homedir(), ".jupyter")
end
jupyter_nbextensions_dir() = joinpath(jupyter_data_dir(), "nbextensions")
jupyter_nbconfig_dir() = joinpath(jupyter_config_dir(), "nbconfig")
