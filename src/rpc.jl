export RPC

"""
    RPC(function; <keyword arguments>)

A function wrapper that can be used to allow Javascript code to call
    user-defined Julia functions.

# Examples
```julia
my_add = RPC((x, y) -> x + y)
my_mult = RPC() do x, y
    x * y
end
my_abs = RPC(abs)

# Create an onClick event handler.
onclick = js\"""
async function handleClick(event) {
    console.log(await \$my_add(1, 2), await \$my_mult(3, 4), await \$my_abs(-5));
}
\"""
dom"button"("Use RPCs!", events=Dict("click" => onclick))
```
"""
struct RPC
    func::Function
    id::String

    function RPC(func::Function; id::String=newid("rpc"))
        rpc = new(func, id)
        registered_rpcs[id] = rpc
        rpc
    end
end

(rpc::RPC)(args...; kwargs...) = rpc.func(args...; kwargs...)

registered_rpcs = Dict{String, RPC}()

tojs(rpc::RPC) = js"WebIO.getRPC($(rpc.id))"

"""
    handle_rpc_request(request)

WebIO-internal method to handle a request to invoke an RPC from the browser.
Looks up the requested RPC from the `registered_rpcs` dict and invokes the function using
the provided arguments and returns the result.
"""
function handle_rpc_request(request::Dict)
    rpc_id = get(request, "rpcId", nothing)
    rpc = get(registered_rpcs, rpc_id, nothing)
    if rpc === nothing
        error("No such RPC (rpcId=$(repr(rpc_id))).")
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
