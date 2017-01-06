using WebDisplay
setup_provider("mux")

function myapp(req)
    Node(:div, "Hello, World!")
end

wdserve(page("/", req -> myapp(req)))
