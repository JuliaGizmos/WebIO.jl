using WebSockets, Sockets
using HTTP, AssetRegistry, WebIO, JSON
using WebSockets: is_upgrade, upgrade

struct WSConnection{T} <: WebIO.AbstractConnection
    sock::T
end

Sockets.send(p::WSConnection, data) = writeguarded(p.sock, JSON.json(data))
Base.isopen(p::WSConnection) = isopen(p.sock)

"""
Prints a inlineable representation of `node` to `io`
"""
function tohtml(io, node)
    # Is this a more reliable way to mount the webio nodes?!
    # At least with the default WebIO method I get some flaky behaviour
    id = rand(UInt64) # TODO is this needed to be unique?!
    print(io,
        "<div id=\"$id\"></div>",
        "<script style='display:none'>",
        "WebIO.mount(document.getElementById('$id'),"
    )
    WebIO.jsexpr(io, WebIO.render(node))
    print(io, ")</script>")
end

function asseturl(file)
    path = string(normpath(WebIO.assetpath), '/', normpath(file))
    WebIO.baseurl[] * AssetRegistry.register(path)
end

function serve_assets(req, serve_page)
    if req.target == "/"
        return serve_page()
    end
    if haskey(AssetRegistry.registry, req.target)
        filepath = AssetRegistry.registry[req.target]
        if isfile(filepath)
            return HTTP.Response(
                200,
                ["Content-Type" => "application/octet-stream"],
                body = read(filepath)
            )
        end
    end
    return "not found"
end

function websocket_handler(req, ws)
    conn = WSConnection(ws)
    while isopen(ws)
        data, success = readguarded(ws)
        !success && break
        msg = JSON.parse(String(data))
        WebIO.dispatch(conn, msg)
    end
end

struct WebIOServer{S}
    server::S
    serve_task::Task
    ws_task::Task
end

kill!(server::WebIOServer) = put!(server.in, HTTP.Servers.KILL)

const singleton_instance = Ref{WebIOServer}()


"""
    WebIOServer(
        default_response::Function = ()-> "";
        baseurl::String = "127.0.0.1", http_port::Int = "8081",
        ws_port::Int = 8000, verbose = false, singleton = true,
        logging_io = devnull
    )

usage:

```example
asset_port = 8081
base_url = "127.0.0.1"
websocket_port = 8000
const app = Ref{Any}()

server = WebIOServer(
        baseurl = base_url, http_port = asset_port, ws_port = websocket_port,
        logging_io = stdout
    ) do
    isassigned(app) || return "no app"
    ws_url = string("ws://", base_url, ':', websocket_port)
    webio_script = asseturl("/webio/dist/bundle.js")
    ws_script = asseturl("/providers/websocket_connection.js")
    return sprint() do io
        print(io, """
            <!doctype html>
            <html>
            <head>
            <meta charset="UTF-8">
            <script> var websocket_url = $(repr(ws_url)) </script>
            <script src="$webio_script"></script>
            <script src="$ws_script"></script>
            </head>
            <body>
        """)
        tohtml(io, app[])
        print(io, """
            </body>
            </html>
        """)
    end
end

app[] = node(:div, "Hello, World",
    style = Dict(
        :backgroundColor => "black",
        :color => "white",
        :padding => "12px"
    )
)
```
"""
function WebIOServer(
        default_response::Function = ()-> "";
        baseurl::String = "127.0.0.1", http_port::Int = "8081",
        ws_port::Int = 8000, verbose = false, singleton = true,
        logging_io = devnull
    )
    WebIO.setbaseurl!(baseurl) # plus port!?
    if !singleton || !isassigned(singleton_instance)
        handler = HTTP.HandlerFunction() do req
            serve_assets(req, default_response)
        end
        server = HTTP.Server(handler)
        server_task = @async (ret = HTTP.serve(server, baseurl, http_port, verbose = verbose))
        tcpref = Ref{Sockets.TCPServer}()
        # Start HTTP listen server on port $port_HTTP"
        ws_task = @async HTTP.listen(
                baseurl, ws_port, tcpref = tcpref, verbose = verbose
            ) do s
            is_upgrade(s.message) && upgrade(websocket_handler, s)
        end
        singleton_instance[] = WebIOServer(server, server_task, ws_task)
    end
    return singleton_instance[]
end
