using IJulia
using IJulia.CommManager

using WebIO

function script(f)
    display(HTML("<script>"*readstring(f)*"</script>"))
end

immutable IJuliaConnection <: AbstractConnection
    comm::CommManager.Comm
end

function Base.send(c::IJuliaConnection, data)
    send_comm(c.comm, data)
end

function main()
    script(Pkg.dir("WebIO", "assets", "webio.bundle.js"))
    script(Pkg.dir("WebIO", "assets", "providers", "ijulia_setup.js"))

    comm = Comm(:webio_comm)
    conn = IJuliaConnection(comm)
    comm.on_msg = function (msg)
        data = msg.content["data"]
        WebIO.dispatch(conn, data)
    end
    nothing
end

main()
