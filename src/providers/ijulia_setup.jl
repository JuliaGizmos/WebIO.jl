using IJulia
using IJulia.CommManager

using WebDisplay

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
    script(Pkg.dir("WebDisplay", "assets", "webdisplay.js"))
    script(Pkg.dir("WebDisplay", "assets", "nodeTypes.js"))
    script(Pkg.dir("WebDisplay", "assets", "ijulia_setup.js"))

    comm = Comm(:webdisplay_comm)
    conn = IJuliaConnection(comm)
    comm.on_msg = function (msg)
        data = msg.content["data"]
        WebDisplay.dispatch(conn, data)
    end
    nothing
end

main()
