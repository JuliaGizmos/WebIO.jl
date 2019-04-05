# A map from `hash(f)` to `f`.
# This is used to lookup the function when we get a request from the frontend.
registered_rpcs = Dict{UInt, Function}()

function tojs(f::Function)
    h = hash(f)
    registered_rpcs[h] = f
    return js"WebIO.getRPC($(string(h)))"
end

"""
    handle_rpc_request(request)

WebIO-internal method to handle a request to invoke an RPC from the browser.
Looks up the requested RPC from the `registered_rpcs` dict and invokes the function using
the provided arguments and returns the result.
"""
function handle_rpc_request(request::Dict)
    rpc_id = get(request, "rpcId", nothing)
    rpc_hash = try parse(UInt, rpc_id) catch nothing end
    rpc = get(registered_rpcs, rpc_hash, nothing)
    if rpc === nothing
        # This generally shouldn't happen; the only instance where it could is if RPC's are inovoked
        # "manually" (i.e. via `WebIO.rpc("foo", ["args"])`)
        return Dict(
            "exception" => "UnknownRPCError: no such rpc (rpcId=$(repr(rpc_id))).",
        )
    end

    arguments = get(request, "arguments", [])
    try
        return Dict(
            "result" => rpc(arguments...)
        )
    catch (e)
        return Dict(
            "exception" => sprint(showerror, e),
        )
    end
end
register_request_handler("rpc", handle_rpc_request)
