# WebIO

| Build | Coverage |
|-------|----------|
| [![Build Status](https://travis-ci.org/JuliaGizmos/WebIO.jl.svg?branch=master)](https://travis-ci.org/JuliaGizmos/WebIO.jl) | [![codecov](https://codecov.io/gh/JuliaGizmos/WebIO.jl/branch/master/graph/badge.svg)](https://codecov.io/gh/JuliaGizmos/WebIO.jl)

WebIO provides a simple abstraction for displaying and interacting with content. It works with:

- [Juno](http://junolab.org) - The hottest Julia IDE
- [IJulia](https://github.com/JuliaLang/IJulia.jl) - Jupyter notebooks for Julia
- [Blink](https://github.com/JunoLab/Blink.jl) - An [Electron](http://electron.atom.io/) wrapper you can use to make Desktop apps
- [Mux](https://github.com/JuliaWeb/Mux.jl) - A web server framework

Scopes once created with WebIO will work on any of these front-ends.

People using WebIO
------------------

This is a non-comprehensive list of websites using WebIO:

+ [Julia Tetris](http://juliatetris.com)

If you want your page listed here, please open an [issue](https://github.com/JuliaGizmos/WebIO.jl/issues/new).

Getting started
---------------

To install WebIO, run:

```julia
Pkg.clone("https://github.com/shashi/WebIO.jl.git")
Pkg.build("WebIO") # this will set up the IJulia server plugin

using WebIO
```

If you want to use WebIO in Jupyter Lab, you need to install the WebIO extension for Jupyter Lab.

```julia
cd(Pkg.dir("WebIO", "assets"))
;jupyter labextension install webio
;jupyter labextension enable webio/jupyterlab_entry
```

**Development setup** if you want to edit the javascript files in this repository, you will need to setup ways to build them. It's made easy for you:
```julia
pkg"add NodeJS"
using WebIO
WebIO.bundlejs() # run every time you update a file
```

### Getting things to display

First, load the front end package (e.g. Blink or Mux; IJulia and Atom packages are already loaded when you are using them). Then run `using WebIO` to load this package.

- On **IJulia** or **Jupyter Lab**
Whenever a code cell returns a `WebIO.Node` object, IJulia will render it. For example,

```julia
In[*]: node(:div, "Hello, World")
```

The `node` (lowercase) function is a helper function which provides a convenient way to construct `WebIO.Node` objects.

- On **Blink**

Set the content of a window to WebIO.Node using `body!` to render it.

```julia
w = Blink.Window()
body!(w, dom"div"("Hello, World"))
```

- On **Mux**

Return the WebIO Node from a web app to render it. Use `webio_serve` to serve the application.

```julia
function myapp(req) # an "App" takes a request, returns the output
    node(:div, "Hello, World!")
end

webio_serve(page("/", req -> myapp(req)))
```

- Generic **HTTP**

You can use the generic HTTP provider for any app - without the need to rely on WebIO.

```julia

# You can just create your own display function
function Base.display(d::MyWebDisplay, m::MIME"application/webio", app)
    println(d.io, "outer html")
    # calling show will make sure a server is running and serves dependencies
    # from AssetRegistry and a websocket connection gets established.
    show(d.io, m, app) #<- prints the html + scripts webio needs to work into io
    println(d.io, "close outer html")
end
# You can customize the server via the following environment variables:

ENV["JULIA_WEBIO_BASEURL"] = "url/to/base/route" # e.g. if you have a proxy

url = ENV["WEBIO_SERVER_HOST_URL"] = "127.0.0.1" # the url you want the server to listen on
http_port = ENV["WEBIO_HTTP_PORT"] = "8081" # the port you want the server to listen on
# the url that the websocket connects to:
ENV["WEBIO_WEBSOCKT_URL"] = string(url, ":", http_port, "/webio_websocket/")

```


Composing content
------------------

Let's say you want to display the following HTML:

```html
<ul class="my-list">
    <li>get milk</li>
    <li>make a pie</li>
</ul>
```

You can create a nested Node object:

```julia
node(:ul,
    node(:li, "get milk"),
    node(:li, "make a pie"), attributes=Dict(:class => "my-list"))
```

`attributes` keyword argument sets the attributes of the HTML element.

Any other keyword argument to `DOM` is set as the property of the [DOM object](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) of the HTML element via JavaScript.

For example,

```julia
node(:ul, className="my-list")
```

does the equivalent of the following in JavaScript:

```js
var element = document.createNode("ul")
element.className = "my-list"
// then adds inserts it to the document wherever it is displayed
```

Some DOM properties can themselves be objects, you can set them using Julia dictionaries:

```julia
node(:div, "Hello, World",
     style=Dict(:backgroundColor => "black",
                :color => "white",
                :padding => "12px"))
```

does the equivalent of

```js
var element = document.createNode("div")
element.style.backgroundColor = "black"
element.style.color = "white"
element.style.padding = "12px"
```

This is in turn equivalent to:

```html
<div style="background-color: black; color: white; padding: 12px">
```

and hence also equivalent to:
```html
node(:div, attributes=Dict(:style => "background-color: black; color: white; padding: 12px"))
```

### The `dom""` macro

The `dom""` [*string macro*](http://docs.julialang.org/en/release-0.4/manual/metaprogramming/#non-standard-string-literals) can be used to simplify the syntax of creating DOM Nodes. The syntax for the macro is:

```julia
dom"div.<class>#<id>[<attr>=<value>,...]"(children...; props...)
```

And is equivalent to:

```julia
node(:div, children..., className="<class>", id="<id>",
     attributes=Dict(attr1=>val1, attr2=>val2...); props...)
```

Everything except the tag ('div' in the example) is optional. So,

`dom"div"`, `dom"div.class1"`, `dom"div.class1.class2"`, `dom"div#my-id"`,
`dom"input.check[type=checkbox]"` are all valid invocations.

WebIO.render
------------

WebIO exports `WebIO.render` generic function which can be extended to define how to render something into WebIO's DOM. Think of it as a better version of `show(io::IO, m::MIME"text/html", x)`. Whenever an object is used as an argument to `node`, this `render` function will be called to create the `Node` object to display.

For example, a TodoItem type like:

```julia
struct TodoItem
    description::String
    done::Bool
end
```

Could have a render method that looks like this:

```julia
import WebIO.render

function render(todoitem::TodoItem)
    dom"div.todo-item"(
        dom"input[type=checkbox]"(checked=todoitem.done),
        todoitem.description,
        style=Dict("display" => "flex", "flex-direction" => "horizontal"),
    )
end
```

A todo list which contains a vector of `TodoItem`s and possibly a `title` field,

```julia
struct TodoList
    title::String
    items::Vector{TodoItem}
end

mylist = TodoList("My todo list",
    [TodoItem("Make my first WebIO widget", false),
     TodoItem("Make a pie", false)])

```

Can render itself like:

```julia
function render(list::TodoList)
    dom"div"(
        dom"h2"(list.title),
        dom"div.todo-list"(
            list.items... # each element will be rendered using WebIO.render
        )
    )
end
```

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
