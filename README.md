# WebDisplay

WebDisplay is a common platform for Julia packages to create web-based widgets. Widgets created with WebDisplay work inside IJulia out-of-the box  (run `setup_ijulia()`). There is work underway to make them work in Atom, Blink and Escher. Graphics packages can use WebDisplay to provide interactive APIs without worrying about communication between Julia and the browser.

## Rendering with WebDisplay

You can create a DOM node or tree and have WebDisplay render it.

```julia
Node(:div,
      Node(:h1, "Clickbait!", className="title", style=Dict(:color=>"red")),
      Node(:p, "You will not believe what happens when you click this link!", className="description"),
      className="article"
)
```

This will render the HTML equivalent of:

```html
<div class="article">
  <h1 class="title" style="color:red">Clickbait!</h1>
  <p class="description">You will not believe what happens when you click this link!</p>
</div>
```

Note that DOM is slightly different from HTML. It is the data structure the browser creates after having parsed HTML. Some commonly useful differences to know are:

- Fields of a DOM node are properties and not attributes. (It's crazy, but) there's a [difference between DOM properties and HTML attributes](http://stackoverflow.com/questions/258469/what-is-the-difference-between-attribute-and-property).
- use the `attributes` faux property in `Node` to set the attribute instead of property. E.g. `Node(:div, attributes=Dict("class" => "myclass"))`
- `class` _attribute_ is className _property_ in DOM
- `style` _attribute_ is an object mapping CSS properties to values. Hiphenated CSS properties like 'background-color' are camelCased in the DOM version.
  therefore, `style="background-color: black"` in HTML is the same as `style=Dict(:backgroundColor=>"black")` in a Node.

## Setting up event handlers

You can set the `events` property to a Dict mapping event names to JavaScript function (in a String).

For example,

```julia
Node(
    :div, "show my messages",
    events=Dict(
      "click" => "function () { alert('Aww, you have no messages.'); }"
    )
)
```

## Context and communication

You can communicate between Julia and JavaScript by creating a `Context` object. Think of it as the mailbox for a subtree of a DOM, it can receive and send "commands". In the example below, we will create a counter which can be incremented and decremented. The changes to the count happen on the Julia side - this is of course an overkill and could have been done all on the JavaScript side, but imagine you are also saving the counter to a database or a file on the server - you'd need the events to come to Julia and go back to the browser. Although, simplistic this example demonstrate a handful of features of Contexts.

```julia

function counter(count=0)
  makecontext() do ctx
    # ctx is the Context object

    # handle(context, command_name) - add a handler for a command coming from JavaScript

    handle(ctx, :change) do d
        send(ctx, :set_count, count+=d)
    end

    # handlejs(ctx, command_name, function_string) - add a handler for a command coming in from the Julia side
    # in this case we access the element with the id "count" from ctx.dom, and set its contents to the new count

    handlejs(ctx, :set_count, "function (ctx,msg) {ctx.dom.querySelector('#count').textContent = msg}")

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

counter(1)

```

You can also create many counters each with its own count state:

```julia
Node(:div,
  map(counter, [1,2,3,4])
)
```

### Context API on Julia

- `handle(f::Function, c::Context, cmd::Symbol)`: Handle a command coming in from JavaScript - `f` gets the data sent along with the command as the argument. (It isdecoded from JSON)
- `handlejs(c::Context, cmd::Symbol, f::String)`: Add a handler for `cmd` sent from Julia side using `send` (see below). `f` is a string containing a function definition in JavaScript. This function should take 2 arguments: a context object and the message (JSON decoded). See Context API on JavaScript section below to learn what you can do with this object.
- `send(c::Context, cmd::Symbol, data::Any)`: send a command to the JavaScript side. `data` is JSON serialized and sent.

### Context API on JavaScript

As you see above, the JS command handler and event handlers get a context object as argument. These Objects are the reflection of a Context on the Julia side.

- `WebDisplay.send(context, command, message)`: invoke a command on the Julia side for the corresponding Context object. (counterpart of `handle(f, ctx::Context, cmd::Symbol)` on the Julia side (see above)
- `context.dom`: this field points to the rendered DOM tree that is wrapped by this context. You can use this to query sub nodes (for example, using [`context.dom.querySelector(query)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)) and to modify their content.

### Context in event handlers and command handlers

Event handlers on the JavaScript side get 2 arguments:

- `event`: an Event object sent by the browser to designate the event
- `context`: the context object

Command handlers get 2 arguments:

- `context`: the context object
- `data`: the data sent along with the command

## CommandSets

You can add a bunch of command handlers to be available at all times on the JavaScript side. This is done by adding a field to the `WebDisplay.CommandSets` object.

```js
WebDisplay.CommandSets.MySet = {
  foo: function (ctx, data) {
    // do foo
    // WebDisplay.send(ctx, some_command, some_data) maybe
  },
  bar: function (ctx, data) {
    // do bar
  }
}
```

These commands can be invoked by naming them as "MySet.foo". i.e. `send(ctx, "MySet.foo", foo_data)` or `send(ctx, "MySet.bar", bar_data)` on the Julia side.

### Basics.eval

Basics is a CommandSet available by default and it contains a single `Basics.eval` command. This takes some JavaScript code in string form and evaluates it. A `context` variable is defined in the evaluation environment which represents the context the command is called on. It's better to set up specific commands and call them since they have the chance of getting compiled by the JavaScript engine to be efficient wheras code run with `Basics.eval` does not.

## Providers

This section is relevant to developers of web interfaces to Julia such as IJulia, Atom and Blink.

A `Provider` is such a Julia package that can set up a communication channel for WebDisplay.

To do this, a package must:

On the JavaScript side:

1. load the JavaScript files `assets/webdisplay.js` and `assets/nodeTypes.js` into their browser environment
2. Add some JavaScript that sets `WebDisplay.sendCallback` to a function that takes a JS object and sends it to the Julia side.
3. set up a listener for messages from Julia, and call `WebDisplay.dispatch(message)` for every message

On the Julia side

1. Have a listener on the Julia side which listens to messages sent by `sendCallback` above and calls `dispatch(context_id::String, command::Symbol, data::Any)` - WebDisplay takes over from here and calls the corresponding event handlers in user code.
2. Create a provider type which represents the provider (e.g. IJuliaProvider)
3. Define `Base.send` on the provider type.
```julia
function Base.send(p::MyProvider, data)
      # figure out a way to send `data` to JavaScript
      # you can use any encoding for the data
end
```
4. Push an instance of the provider onto the provider stack using `WebDisplay.push_provider!(provider)`

For an example, see how it's done for IJulia at `src/ijulia_setup.jl` and `assets/ijulia_setup.js`.
