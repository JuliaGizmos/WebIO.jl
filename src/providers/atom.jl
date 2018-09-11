using Logging

const pages = Dict{String,Any}()
const serving = Ref{Bool}(false)

function routepages(req)
    return pages[req[:params][:id]]
end

function create_silent_socket(req)
    # hide errors
    try
        create_socket(req)
    catch err
        @debug err
    end
end

function Base.show(io::IO, ::MIME"application/juno+plotpane", n::Union{Node, Scope, AbstractWidget})
    global pages, server
    id = rand(UInt128)
    pages[string(id)] = n

    port = rand(8000:9000)

    if !serving[]
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

                Mux.serve(http, websock, port)
                serving[] = true
            end
        end
    end
    print(io, "<meta http-equiv=\"refresh\" content=\"0; url=http://localhost:$(port)/$(id)\"/>")
end
