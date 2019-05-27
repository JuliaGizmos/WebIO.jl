# WebIO

| Build | Coverage |
|-------|----------|
| [![Build Status](https://travis-ci.org/JuliaGizmos/WebIO.jl.svg?branch=master)](https://travis-ci.org/JuliaGizmos/WebIO.jl) | [![codecov](https://codecov.io/gh/JuliaGizmos/WebIO.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/JuliaGizmos/WebIO.jl)

WebIO provides a simple abstraction for displaying and interacting with content. It works with:

- [Juno](http://junolab.org) - The hottest Julia IDE
- [IJulia](https://github.com/JuliaLang/IJulia.jl) - Jupyter notebooks for Julia
- [Blink](https://github.com/JunoLab/Blink.jl) - An [Electron](http://electron.atom.io/) wrapper to make desktop apps
- [Mux](https://github.com/JuliaWeb/Mux.jl) - A web server framework

Getting started
---------------

#### Installation
To install WebIO, simply `Pkg.add("WebIO")`.

If you want to use WebIO in Jupyter Lab, you need to install the WebIO extension for Jupyter Lab.

```julia
cd(joinpath(dirname(pathof(WebIO)), "..", "packages"))
;jupyter labextension install ./jupyter-lab-provider
;jupyter labextension enable webio/jupyterlab_entry
```

### Displaying content

First, load the front end package (e.g. Blink or Mux; IJulia and Atom are already loaded if you are using those frontends). Then run `using WebIO` to load this package.

#### Using IJulia (Jupyter Notebook and JupyterLab)
Whenever a code cell returns a WebIO object, it will be rendered as rich HTML. For example,

```julia
In[*]: node(:div, "Hello, World")
```

#### Using Blink
Set the content of a window to WebIO node using `body!`.

```julia
w = Blink.Window()
body!(w, dom"div"("Hello, World"))
```

#### Using Mux
Return the WebIO Node from a web app to render it. Use `webio_serve` to serve the application.
```julia
function myapp(req) # an "App" takes a request, returns the output
    return node(:div, "Hello, World!")
end

webio_serve(page("/", req -> myapp(req)))
```

#### Using Generic HTTP
You can use the generic HTTP provider for any app.

```julia
# Create your own display function
function Base.display(d::MyWebDisplay, m::WebIO.WEBIO_APPLICATION_MIME, app)
    println(d.io, "outer html")
    # Calling show will make sure a server is running and serves dependencies
    # from AssetRegistry and a websocket connection gets established.
    show(d.io, m, app) #<- prints the html + scripts webio needs to work into io
    println(d.io, "close outer html")
end

# You can customize the server via the following environment variables:

# The base URL where your app lives (e.g. if used behind a proxy server)
ENV["JULIA_WEBIO_BASEURL"] = "url/to/base/route"
# The host (e.g. hostname or IP address) that the server will listen on
host = ENV["WEBIO_SERVER_HOST_URL"] = "127.0.0.1"
# The port that the HTTP server will listen on
port = ENV["WEBIO_HTTP_PORT"] = "8081"
# The url that the websocket connects to
ENV["WEBIO_WEBSOCKT_URL"] = string(host, ":", port, "/webio_websocket/")
```

Composing content
------------------

Suppose we want to display the following HTML.
```html
<ul class="my-list">
    <li>get milk</li>
    <li>make a pie</li>
</ul>
```

We can nest nodes inside of each other to accomplish this.
```julia
node(:ul,
    node(:li, "get milk"),
    node(:li, "make a pie"),
    attributes=Dict(:class => "my-list"),
)
```

The `attributes` keyword argument sets the attributes of the HTML element (via the [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) browser function). Any other keyword argument is set as the property of the [DOM node](https://developer.mozlla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) itself.

**N.B.** Attribute values should be strings (or `nothing`, in which case the attribute is deleted). Attribute keys are specified with the name as would be written in HTML (e.g. `class` for the CSS class name) whereas properties are specified as the name in the browser DOM API (e.g. `className`). This is because one writes
```html
<p class="important">Don't stuff beans up your nose!</p>
```
whereas the DOM API would be
```js
myParagraph = document.createElement("p");
myParagraph.className = "important";
// Or, equivalently...
myParagraph.setAttribute("class", "important");
```

For example, the following are equivalent.
```julia
node(:ul, className="my-list")
node(:ul, attributes=Dict(:class => "my-list"))
```


Some DOM attributes (most importantly, `style`) can be specified as Julia dictionaries.
```julia
node(
    :div,
    "Hello, World",
    style=Dict(
        :backgroundColor => "black",
        :color => "white",
        :padding => "12px",
   )
)
```

This is equivalent to this snippet using `attributes`.
```julia
node(
    :div,
    "Hello, World",
    attributes=Dict(
        :style => "background-color: black; color: white; padding: 12px",
    ),
)
```

### The `dom""` macro

The `dom""` string macro can be used to simplify the syntax of creating DOM Nodes. The syntax for the macro is
```julia
dom"div.<class>#<id>[<attr>=<value>,...]"(children...; props...)
```

And is equivalent to:

```julia
node(:div, children..., className="<class>", id="<id>",
     attributes=Dict(:attr1 => val1, :attr2 => val2...); props...)
```

Everything except the tag ("`div`" in the example) is optional. So,
`dom"div"`, `dom"div.class1"`, `dom"div.class1.class2"`, `dom"div#my-id"`,
`dom"input.check[type=checkbox]"` are all valid.

WebIO.render (Rendering Custom Objects)
------------

WebIO exports `WebIO.render` function which can be extended to define how to render a Julia object into the DOM. Think of it as a better version of `show(io::IO, m::MIME"text/html", x)`. Whenever an object is used as an argument to `node`, this `render` function will be called to create the `Node` object to display.

For example, given the type
```julia
struct TodoItem
    description::String
    done::Bool
end
```
we could have a render method that looks like

```julia
function WebIO.render(todoitem::TodoItem)
    return dom"div.todo-item"(
        dom"input[type=checkbox]"(checked=todoitem.done),
        todoitem.description,
        style=Dict("display" => "flex", "flex-direction" => "horizontal"),
    )
end
```

If we have a todo list,
```julia
struct TodoList
    title::String
    items::Vector{TodoItem}
end

mylist = TodoList(
    "My todo list",
    [
        TodoItem("Make my first WebIO widget", false),
        TodoItem("Make a pie", false),
    ],
)
```
we can render it via
```julia
function WebIO.render(list::TodoList)
    return dom"div"(
        dom"h2"(list.title),
        dom"div.todo-list"(
            WebIO.render.(list.items)...
        ),
    )
end
```

Always remember to recursively `WebIO.render` any _child_ elements if necessary.

## Executing JavaScript
Event handlers can be set up by passing a dict as the `events` keyword argument to `node`, (and hence `dom"foo"`). For example,

```julia
dom"button"("Greet",
     events=Dict("click" => js"function (event) { alert('Hello, World!') }"))
```

This will create a button which shows an alert box with the message "Hello, World!" when clicked.

There are 2 ways of creating JavaScript expressions with WebIO.

First, you can use the `js""` string macro to just write any JavaScript as a string. For example

```
js"""
alert("Hello, World!")
"""
```

This will return an object of type `JSString` which can be used anywhere WebIO expects javascript expressions.

The second way is to use the `@js` macro from [JSExpr.jl](https://github.com/JuliaGizmos/JSExpr.jl). `@js` macro can translate Julia expressions to JavaScript expressions (`JSString`). For example,

```julia
using JSExpr # gives @js
```

```julia
@js alert("Hello, World!")
```

or

```julia
@js Math.random()
```

The same example could have been written using `@js` like this:


```julia
dom"button"("Greet",
     events=Dict("click" => @js event -> alert("Hello, World!")))
```

Note that `@js` just translates a Julia expression to the equivalent JavaScript, it does not compile the code. The variables and functions you reference in a `@js` expression must be defined in the JavaScript context it will run in (and need not be defined in Julia).

## Loading JavaScript dependencies

You can load dependencies by creating a Scope object and passing in `imports` argument.

```julia

using WebIO, JSExpr

w = Scope(imports=["//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.js"])

onimport(w, @js function (p5)
    function sketch(s)
        s.setup = () -> s.createCanvas(640, 480)

        s.draw = function ()
          if s.mouseIsPressed
            s.fill(0)
          else
            s.fill(255)
          end
          s.ellipse(s.mouseX, s.mouseY, 80, 80)
        end
    end
    @new p5(sketch, this.dom.querySelector("#container"))
end)

w(dom"div#container"())
```

## Communicating between Julia and JavaScript

```julia
w = Scope()
```

A scope object acts as a container for communication (more details below). To exchange values between JavaScript and Julia, we also need to add `Observable` objects to the scope. This can be done by passing the scope, and an identifier for the observable (as string) and a default value to the `Observable` constructor:

```julia
obs = Observable(w, "rand-value", 0.0)
```

You can get the value of `obs` with the syntax `obs[]`. You can set the value using the syntax `obs[] = val`. To listen to changes to the value you can use the `on` function.

```julia
on(f, obs)
```

This will run `f` on every update to `obs`.

### Sending values from JavaScript to Julia

Below is a scope which communicates with Julia. Let's run through its construction line-by-line. The following scope contains a button which sends a random number, generated in JavaScript, to Julia. We will print this number on the Julia side.

```julia
function random_print_button()
    w = Scope()

    obs = Observable(w, "rand-value", 0.0)

    on(obs) do x
        println("JS sent $x")
    end

    w(
      dom"button"(
        "generate random",
        events=Dict("click"=>@js () -> $obs[] = Math.random()),
      ),
    )
end
```

`w` is a Scope object, it acts a scope or context for communication. Every call to `random_print_button` will create a new scope and hence keep the updates contained within it. This allows there to be many instances of the same scope on a page.

An `Observable` is a value that can change over time. `Observable(w, "rand-value", 0.0)` creates an observable by the name "rand-value" associated with scope `w`. `on(f, x)` sets up an event handler such that `f` is called with the value of `x` every time `x` is updated.

An observable can be updated using the `x[] = value` syntax on Julia. To update the observable from the JavaScript side, you can use the following syntax:

```julia
@js $obs[] = Math.random()
```

This will return a `JSString` which you can use anywhere WebIO expects JavaScript, such as a event handler. But an event handler should be a function so you would need to enclose this in a function: `@js () -> $obs[] = Math.random()`.

```
  dom"button"(
    "generate random",
    events=Dict("click"=>@js () -> $obs[] = Math.random()),
  )
```
creates a button UI which updates the `obs` observable with `Math.random()` (executed in JS) on every click.

Notice the last expression actually _calls_ the scope `w` with the contents to display. This causes the contents to be _wrapped_ in `w`'s context. All uses of observables associated with `w` (e.g. `obs`) should be enclosed in the scope `w`.

### Sending values from Julia to JavaScript

Here's a clock where the time is formatted and updated every second from Julia. We use the `onjs` handler and mutate the `#clock` DOM element to acheive this.

```julia
using Dates

w = Scope()
obs = Observable(w, "clock-value", "")

timestr() = Dates.format(now(), "HH:MM:SS")

# update timestamp every second
@async while true
    sleep(1)
    obs[] = timestr()
end

# on every update to `obs`, replace the text content of #clock
onjs(obs, @js val -> begin
    @var clock = this.dom.querySelector("#clock")
    clock.textContent = val
end)

w(
  dom"div#clock"(
    timestr(),
  ),
)
```

The javascript function passed to `onjs` gets the value of the update as the argument. `this` is set to the Scope object. Notice the use of `this.dom.querySelector("#clock")`. `this.dom` contains the rendered DOM of the scope. `querySelector("#<id>")` will look up the element which has the id `<id>`. `clock.textContent = val` will set the text contained in `clock`, the DOM element.

For an even easier way to send values from Julia to JavaScript, we can simply rely on the fact that WebIO knows how to render `Observable`s directly to HTML. In this case WebIO will automatically construct a `Scope` and insert the relevant JavaScript to update the rendered content whenever the `Observable` changes value:

```julia
timestr() = Dates.format(now(), "HH:MM:SS")

clock_obs = Observable(timestr())
@async while true
    sleep(1)
    clock_obs[] = timestr()
end
clock_obs
```

People using WebIO
------------------

This is a non-comprehensive list of websites using WebIO:

+ [Julia Tetris](http://juliatetris.com)

If you want your page listed here, please open an [issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).
