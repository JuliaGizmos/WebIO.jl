using WebIO
setup_provider("mux")

function myapp(req)
    Node(:div, "Hello, World!")
end

webio_serve(page("/", req -> myapp(req)))
