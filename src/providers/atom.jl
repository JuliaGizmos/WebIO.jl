using Logging

pages = Dict{String,Any}()
server = Ref{Any}(nothing)

function routepages(req)
    return pages[req[:params][:id]]
end

function create_silent_socket(req)
    # hide errors
    try
        create_socket(req)
    catch err
    end
end

function Base.show(io::IO, ::MIME"application/juno+plotpane", n::Union{Node, Scope, AbstractWidget})
    global pages, server
    id = rand(UInt128)
    pages[string(id)] = n

    if server[] === nothing
        # hide http logging messages
        with_logger(NullLogger()) do
            @async begin
                http = Mux.App(Mux.mux(
                    Mux.defaults,
                    Mux.route("/:id", routepages),
                    Mux.notfound()
                ))

                websock = Mux.App(Mux.mux(
                    Mux.wdefaults,
                    Mux.route("/webio-socket", create_silent_socket),
                    Mux.wclose,
                    Mux.notfound(),
                ))

                server[] = Mux.serve(http, websock, 8000)
            end
        end
    end
    print(io, "<meta http-equiv=\"refresh\" content=\"0; url=http://localhost:8000/$(id)\"/>")
end
