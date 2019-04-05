export DummyConnection

using Sockets
using DataStructures

struct DummyConnection <: WebIO.AbstractConnection
    inbox::Queue{Any}

    DummyConnection() = new(Queue{Any}())
end

Base.take!(c::DummyConnection) = dequeue!(c.inbox)
Sockets.send(c::DummyConnection, data) = enqueue!(c.inbox, data)

"""
    open_window()

Open a window, optionally showing it when the BLINK_DEBUG environment variable
is set (to allow for seeing what happens in the Electron console).
"""
function open_window()
    if haskey(ENV, "BLINK_DEBUG")
        w = Window(Dict(:show => true))
        @js w localStorage.debug = "*"
        opentools(w)
        return w
    end
    return Window(Dict(:show => false))
end