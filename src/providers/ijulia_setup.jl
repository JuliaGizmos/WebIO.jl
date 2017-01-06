using IJulia
using IJulia.CommManager

using WebDisplay

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
        data = msg.content["data"]
        WebDisplay.dispatch(data)
    end
    WebDisplay.push_provider!(IJuliaProvider(comm))
    nothing
end

function Base.send(p::IJuliaProvider, data)
    send_comm(
        p.comm,
        data
    )
end

main()
