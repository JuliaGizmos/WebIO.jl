"""
    RPC(function; <keyword arguments>)

A function wrapper that can be used to allow Javascript code to call
    user-defined Julia functions.

# Examples
"""
struct RPC
    func::Function
    id::String

    function RPC(func::Function; id::String=newid("rpc"))
        rpc = new(func, id)
        rpcs[id] = rpc
        rpc
    end
end

(rpc::RPC)(args...; kwargs...) = rpc.func(args...; kwargs...)

rpcs = Dict{String, RPC}()

"""
    handle_rpc_request(request)

WebIO-internal method to handle a request to invoke an RPC from the browser.
Looks up the requested RPC from the `rpcs` dict and invokes the function using
the provided arguments and returns the result.
"""
function handle_rpc_request(request::Dict)::ResponseDict
    rpc_id = get(request, "rpcId", nothing)
    rpc = get(rpcs, rpc_id, nothing)
    if rpc === nothing
        error("No such RPC (rpcId=$(repr(rpc_id))).")
    end

    arguments = get(request, "arguments", [])
    try
        return Dict{String, Any}(
            "result" => rpc(arguments...)
        )
    catch (e)
        return Dict(
            "exception" => sprint(showerror, e),
        )
    end
end
register_request_handler("rpc", handle_rpc_request)
