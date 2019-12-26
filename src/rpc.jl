# A map from `hash(f)` to `f`.
# This is used to lookup the function when we get a request from the frontend.
# We don't do anything with `WeakRef`s because we don't have any way to keep
# track of live "references" to functions that exist in JS code on frontends.
# In general, this just means that you should use lots of anonymous functions
# when using RPC's (normal functions are never GC'd anyway).
registered_rpcs = Dict{UInt, Function}()

# Define a tojs method for use when interpolating functions into JSStrings.
# TODO: this might need to change because we moved a lot of that stuff to
# JSExpr and I'm not sure how this fits in.
function tojs(f::Function)
    h = hash(f)
    registered_rpcs[h] = f
    return js"WebIO.getRPC($(string(h)))"
end

"""
    UnknownRPCError(rpc_id::String)

An error that is thrown whenever an unknown RPC is invoked.
"""
struct UnknownRPCError <: Exception
    rpc_id::String
end

function Base.showerror(io::IO, exc::UnknownRPCError)
    print(io, "UnknownRPCError: unknown rpc id: $(exc.rpc_id)")
end

"""
    handle_request(::Val{:rpc}, conn, request)

WebIO-internal method to handle a request to invoke an RPC from the browser.
Looks up the requested RPC from the `registered_rpcs` dict and invokes the function using
the provided arguments and returns the result.
"""
function handle_request(::Val{:rpc}, conn::AbstractConnection, request)
    rpc_id = get(request, "rpcId", nothing)
    rpc_hash = try parse(UInt, rpc_id) catch nothing end
    rpc = get(registered_rpcs, rpc_hash, nothing)
    if rpc === nothing
        # This generally shouldn't happen; the only instance where it could is
        # if RPC's are inovoked "manually" (i.e. via
        # `WebIO.rpc("foo", ["args"])`).
        throw(UnknownRPCError(rpc_id))
    end

    arguments = get(request, "arguments", [])
    try
        return Dict(
            "result" => rpc(arguments...)
        )
    catch (e)
        # We catch the error here and return it is part of the response payload
        # instead of using the error handling that happens if we were to simply
        # throw it here.
        # The reason for that is that the underlying method threw, but there was
        # no issue with the RPC call itself (whereas UnknownRPCError is thrown
        # because it means we couldn't complete the RPC request).
        return Dict(
            "exception" => sprint(showerror, e),
        )
    end
end
