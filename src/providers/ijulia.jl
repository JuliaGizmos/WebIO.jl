using AssetRegistry
using Sockets
using WebIO

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
        @warn "IJulia doesn't have register_mime; WebIO may not work as expected. Please upgrade to IJulia v1.13.0 or greater."
    end

    script_id = "webio-setup-$(rand(UInt64))"
    warning_div_id = "webio-warning-$(rand(UInt64))"
    setup_script = js"""
        // Immediately-invoked-function-expression to avoid global variables.
        (function() {
            var warning_div = document.getElementById($(warning_div_id));
            var hide = function () {
                var script = document.getElementById($(script_id));
                var parent = script && script.parentElement;
                var grandparent = parent && parent.parentElement;
                if (grandparent) {
                    grandparent.style.display = "none";
                }
                warning_div.style.display = "none";
            };
            if (typeof Jupyter !== "undefined") {
                console.log("WebIO detected Jupyter notebook environment.");
                // Jupyter notebook.
                var extensions = (
                    Jupyter
                    && Jupyter.notebook.config.data
                    && Jupyter.notebook.config.data.load_extensions
                );
                if (extensions && extensions[$(JUPYTER_NBEXTENSION_NAME)]) {
                    // Extension already loaded.
                    console.log("Jupyter WebIO nbextension detected; not loading ad-hoc.");
                    hide();
                    return;
                }
            } else if (window.location.pathname.includes("/lab")) {
                // Guessing JupyterLa
                console.log("Jupyter Lab detected; make sure the @webio/jupyter-lab-provider labextension is installed.");
                hide();
                return;
            }
        })();
        """
    display(HTML("""
        <script>
        $(setup_script)
        </script>
        <p
            id="$(warning_div_id)"
            class="output_text output_stderr"
            style="padding: 1em; font-weight: bold;"
        >
            Unable to load WebIO. Please make sure WebIO works for your Jupyter client.
            For troubleshooting, please see <a href="https://juliagizmos.github.io/WebIO.jl/latest/providers/ijulia/">
            the WebIO/IJulia documentation</a>.
            <!-- TODO: link to installation docs. -->
        </p>
        """
    ))
end

WebIO.setup_provider(::Val{:ijulia}) = main() # calling setup_provider(Val(:ijulia)) will display the setup javascript
WebIO.setup(:ijulia)
