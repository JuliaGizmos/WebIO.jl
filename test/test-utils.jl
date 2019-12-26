using WebIO

using Sockets

using DataStructures
using JSON

export DummyConnection

mutable struct DummyConnection <: WebIO.AbstractConnection
    inbox::Queue{Any}
    isopen::Bool

    DummyConnection(; isopen::Bool=true) = new(Queue{Any}(), isopen)
end

function DummyConnection(s::Scope)
    conn = DummyConnection(isopen=true)
    WebIO.dispatch(conn, Dict(
        "type" => "command",
        "command" => "setup_scope",
        "payload" => Dict(
            "scope" => WebIO.scopeid(s),
        ),
    ))
    return conn
end

Base.isopen(c::DummyConnection) = c.isopen
Base.take!(c::DummyConnection) = dequeue!(c.inbox)
function Sockets.send(c::DummyConnection, jl_data)
    # Emulate the lowering process (messages that are "sent" by WebIO can
    # sometimes include "rich" things like `JSString`s and we want to lower
    # them to regular strings).
    data = JSON.parse(JSON.json(jl_data))
    return enqueue!(c.inbox, data)
end

# """
#     open_window()
#
# Open a window, optionally showing it when the BLINK_DEBUG environment variable
# is set (to allow for seeing what happens in the Electron console).
# """
# function open_window()
#     if haskey(ENV, "BLINK_DEBUG")
#         w = Window(Dict(:show => true))
#         @js w localStorage.debug = "*"
#         opentools(w)
#         return w
#     end
#     return Window(Dict(:show => false))
# end
