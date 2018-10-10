using AssetRegistry
using Sockets

struct IJuliaConnection <: AbstractConnection
    comm::IJulia.CommManager.Comm
end

function Sockets.send(c::IJuliaConnection, data)
    IJulia.send_comm(c.comm, data)
end

Base.isopen(c::IJuliaConnection) = haskey(IJulia.CommManager.comms, c.comm.id)

WebIO.register_renderable(T::Type, ::Val{:ijulia}) = nothing

function IJulia.CommManager.register_comm(comm::IJulia.CommManager.Comm{:webio_comm}, x)
    conn = IJuliaConnection(comm)
    comm.on_msg = function (msg)
        data = msg.content["data"]
        WebIO.dispatch(conn, data)
    end
end

function main()
    if !IJulia.inited
        # If IJulia has not been initialized and connected to Jupyter itself,
        # then we have no way to display anything in the notebook and no way
        # to set up comms, so this function cannot run. That's OK, because
        # any IJulia kernels will start up with a fresh process and a fresh
        # copy of WebIO and IJulia.
        return
    end

    # https://github.com/JuliaLang/IJulia.jl/pull/755
    if isdefined(IJulia, :register_jsonmime)
        IJulia.register_jsonmime(WEBIO_NODE_MIME())
    else
        @warn "IJulia doesn't have register_mime. WebIO may not work as expected."
    end

    # TODO: we need to render a MIME bundle that's a no-op if the frontend
    # nbextension is installed, but renders this HTML if it's not.
    # Currently, WebIO in Jupyter without the accompanying nbextension results in WebIO not working
    # (possibly silently?).

    # key = AssetRegistry.register(joinpath(@__DIR__, "..", "..", "assets"))
    # display(HTML("<script class='js-collapse-script' src='$(baseurl[])$key/webio/dist/bundle.js'></script>"))
    # display(HTML("<script class='js-collapse-script' src='$(baseurl[])$key/providers/ijulia_setup.js'></script>"))
    # display(HTML("""<script class='js-collapse-script'>\$('.js-collapse-script').parent('.output_subarea').css('padding', '0');</script>"""))

    # IJulia probably(?) shouldn't be adding tags to head in the notebook.
    # display(HTML("""
    #     <script class='js-collapse-script'>
    #         var curMatch =
    #             window.location.href
    #             .match(/(.*?)\\/notebooks\\/.*\\.ipynb/);
    #
    #         curMatch = curMatch ||
    #             window.location.href
    #             .match(/(.*?)\\/apps\\/.*\\.ipynb/);
    #
    #         if ( curMatch ) {
    #             \$('head').append('<base href="' + curMatch[1] + '/">');
    #         }
    #     </script>
    # """))
end

WebIO.setup_provider(::Val{:ijulia}) = main() # calling setup_provider(Val(:ijulia)) will display the setup javascript
WebIO.setup(:ijulia)
