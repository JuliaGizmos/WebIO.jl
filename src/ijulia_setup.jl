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

immutable IJuliaProvider end

function main()
    script(Pkg.dir("WebDisplay", "assets", "webdisplay.js"))
    script(Pkg.dir("WebDisplay", "assets", "createNode.js"))
    script(Pkg.dir("WebDisplay", "assets", "ijulia_setup.js"))
    global webdisplay_comm

    comm = Comm(:web_display_ijulia)
    comm.on_msg = function (msg)
        logfile("/tmp/msg", msg)
        cmd = msg["command"]
        dispatch(msg["context_id"], Symbol(cmd), msg["data"])
    end
    WebDisplay.push_provider!(IJuliaProvider())
end

function Base.send(::IJuliaProvider, id, cmd, data)
    global webdisplay_comm

    send(
        comm,
        Dict("context_id" => id,
             "command" => cmd,
             "data" => data
        )
    )
end

main()
