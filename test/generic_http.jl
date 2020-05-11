using Test
using WebIO

using HTTP, WebSockets

@testset "Generic HTTP Provider" begin
    port = 50000 + rand(UInt8)
    server = WebIO.serve_generic_http(http_port=port) do req
        return dom"p"("Hello, world!")
    end

    function tryrepeat(f::Function, n::Integer, sleep_time)
        for i in 1:n
            try
                return f()
            catch exc
                if i == n
                    rethrow()
                end
                sleep(sleep_time)
            end
        end
    end

    res = tryrepeat(5, 0.1) do
        HTTP.get("http://localhost:$(port)")
    end
    @test res.status == 200
    content = String(res.body)
    @test occursin("Hello, world!", content)
    close(server)
end
