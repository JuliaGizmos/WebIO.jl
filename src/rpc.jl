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
# `request` is annotated `AbstractDict` rather than `Dict` because it comes
# straight off the wire: JSON.jl v1 materializes objects as `JSON.Object`, which
# is an `AbstractDict` but not a `Dict`. A `Dict` annotation here fails to match,
# and `dispatch_request` turns the resulting MethodError into an error response,
# so the RPC silently never runs.
function handle_rpc_request(request::AbstractDict)
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
