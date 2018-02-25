using IJulia
using IJulia.CommManager

using WebIO

immutable IJuliaConnection <: AbstractConnection
    comm::CommManager.Comm
end

function Base.send(c::IJuliaConnection, data)
    send_comm(c.comm, data)
end

function WebIO.register_renderable(T::Type)
    WebIO.register_renderable_common(T)
end

function main()
    display(HTML("<script src='/pkg/WebIO/webio/bundle.js'></script>"))
    display(HTML("<script src='/pkg/WebIO/providers/ijulia_setup.js'></script>"))

    comm = Comm(:webio_comm)
    conn = IJuliaConnection(comm)
    comm.on_msg = function (msg)
        data = msg.content["data"]
        WebIO.dispatch(conn, data)
    end
    nothing
end

main()
