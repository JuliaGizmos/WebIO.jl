module IJuliaProvider

using IJulia
using IJulia.CommManager
using AssetRegistry
using Sockets
using WebIO

struct IJuliaConnection <: AbstractConnection
    comm::CommManager.Comm
end

function Sockets.send(c::IJuliaConnection, data)
    send_comm(c.comm, data)
end

Base.isopen(c::IJuliaConnection) = haskey(IJulia.CommManager.comms, c.comm.id)

WebIO.register_renderable(T::Type, ::Val{:ijulia}) = nothing

function main()
    if !IJulia.inited
        # If IJulia has not been initialized and connected to Jupyter itself,
        # then we have no way to display anything in the notebook and no way
        # to set up comms, so this function cannot run. That's OK, because
        # any IJulia kernels will start up with a fresh process and a fresh
        # copy of WebIO and IJulia.
        return
    end
    key = AssetRegistry.register(joinpath(@__DIR__, "..", "..", "assets"))

    display(HTML("""
        <script class='js-collapse-script'>
            var curMatch =
                window.location.href
                .match(/(.*?)\\/notebooks\\/.*\\.ipynb/);

            curMatch = curMatch ||
                window.location.href
                .match(/(.*?)\\/apps\\/.*\\.ipynb/);

            if ( curMatch ) {
                \$('head').append('<base href="' + curMatch[1] + '/">');
            }
        </script>
    """))

    display(HTML("<script class='js-collapse-script' src='$(baseurl[])$key/webio/dist/bundle.js'></script>"))
    display(HTML("<script class='js-collapse-script' src='$(baseurl[])$key/providers/ijulia_setup.js'></script>"))

    display(HTML("""
      <script class='js-collapse-script'>
        \$('.js-collapse-script').parent('.output_subarea').css('padding', '0');
      </script>
    """))

    comm = Comm(:webio_comm)
    conn = IJuliaConnection(comm)
    comm.on_msg = function (msg)
        data = msg.content["data"]
        WebIO.dispatch(conn, data)
    end
    nothing
end

WebIO.setup_provider(::Val{:ijulia}) = main() # calling setup_provider(Val(:ijulia)) will display the setup javascript
WebIO.setup(:ijulia)

end
