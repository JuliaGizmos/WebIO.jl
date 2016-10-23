using IJulia
using IJulia.CommManager

using WebDisplay

function logfile(file, msg)
    open(file, "a") do io
        write(io, string(msg))
    end
end

function script(f)
    display(HTML("<script>"*readstring(f)*"</script>"))
end

immutable IJuliaProvider comm::Comm end

function main()
    script(Pkg.dir("WebDisplay", "assets", "webdisplay.js"))
    script(Pkg.dir("WebDisplay", "assets", "nodeTypes.js"))
    script(Pkg.dir("WebDisplay", "assets", "ijulia_setup.js"))

    comm = Comm(:webdisplay_comm)
    comm.on_msg = function (msg)
        logfile("/tmp/msg", msg)
        content = msg.content["data"]
        cmd = content["command"]
        WebDisplay.dispatch(content["context"], Symbol(cmd), content["data"])
    end
    WebDisplay.push_provider!(IJuliaProvider(comm))
end

function Base.send(p::IJuliaProvider, id, cmd, data)
    send_comm(
        p.comm,
        Dict(
            "type" => "command",
            "nodeType" => "Context",
            "context" => id,
            "command" => cmd,
            "data" => data,
        )
    )
end

main()
