using WebDisplay
setup_provider("mux")

function counter(count=0)
    withcontext(Context()) do ctx
        # ctx is the Context object

        # handle(context, command_name) - add a handler for a command coming from JavaScript

        handle!(ctx, :change) do d
            send(ctx, :set_count, count+=d)
        end

        # handlejs(ctx, command_name, function_string) - add a handler for a command coming in from the Julia side
        # in this case we access the element with the id "count" from ctx.dom, and set its contents to the new count

        handlejs!(ctx, :set_count, "function (ctx,msg) {ctx.dom.querySelector('#count').textContent = msg}")

        # the btn function defined below takes a label and a change value and creates a button which
        # when clicked, asks julia to change the counter by the given change value by sending the "change" command
        # recall that we have added the handler for :change using `handle` above.

        btn(label, change) = Node(:button, label,
                events=Dict(
                    # an event handler on Javascript always gets two arguments: the event and the context
                    # event is object passed by JavaScript into the event handler, and context is the context
                    # using which you can talk to julia or access and modify contents of the context (context.dom as seen above)
                    "click"=>"function (event,ctx) { WebDisplay.send(ctx, 'change', $change) }"
                )
            )

        # This function should return the DOM object that is watched over by the context
        # for relaying messages.

        Node(:div,
            btn("increment", 1),
            btn("decrement", -1),
            Node(:div, string(count), id="count"),
        )
    end
end

function myapp(req)
    Node(:div, counter(1))
end

wdserve(page("/", req -> myapp(req)))


