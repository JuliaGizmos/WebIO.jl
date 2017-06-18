# WebIO

WebIO is a platform for writing web-based widgets.

It works inside these interfaces to Julia:

- [Juno](http://junolab.org) - The hottest Julia IDE
- [IJulia](https://github.com/JuliaLang/IJulia.jl) - Jupyter notebooks for Julia
- [Blink](https://github.com/JunoLab/Blink.jl) - An [Electron](http://electron.atom.io/) wrapper you can use to make Desktop apps
- [Mux](https://github.com/JuliaWeb/Mux.jl) - A web server framework

Widgets once created with WebIO will work on any of these front-ends.

Setting up WebIO
---------------------

To install WebIO's Julia dependencies, run:

```julia
Pkg.clone("https://github.com/shashi/WebIO.jl.git")
```

## JavaScript dependencies

To use WebIO, you will need to install some JavaScript dependencies. This can be done on Linux and Mac by first installing [nodejs](https://nodejs.org/en/), and then running

```julia
using WebIO
WebIO.devsetup()
```
This will download and install [`yarn`](https://yarnpkg.com/) and then the dependencies, namely [webpack](https://webpack.github.io/) and [babel](https://babeljs.io/). These are used to develop and package the javascript parts of WebIO. The next step is to compile the JavaScript files into a *bundle*.

```julia
WebIO.bundlejs(watch=false)
```
(You can ignore this error when running the above: `Module not found: Error: Can't resolve 'fs'`. [Issue here](https://github.com/JuliaGizmos/WebIO.jl/issues/12))

This should create a file called `webio.bundle.js` under the `assets/` directory. `watch=true` starts a webpack server which watches for changes to the javascript files under `assets/` and recompiles them automatically. This is very useful as you incrementally make changes to the Javascript files.

_These steps will be optional once WebIO is released and will only be required when hacking on WebIO._

We plan to move this system to the build step once [julia#20082](https://github.com/JuliaLang/julia/issues/20082) is available in some form.

### Hello, World!: Getting things to display

After having loaded a front-end package, (one of IJulia, Atom, and Blink).

```julia
using WebIO
WebIO.setup()
```

If `WebIO.setup()` finished succesfully then you should be good to start creating simple UIs using the `dom""()` macro.

In IJulia, whenever a code cell returns a `WebIO.Node` object, IJulia will render it correctly.

On Blink, pass the object returned by `dom""` to `body!` of a window or page. This will replace the contents of the page with the rendered version of the object.

WebIO can be used with Mux by returning a `dom""` expression from an app.

```
using WebIO
using Mux

WebIO.setup()

function myapp(req)
    dom"div"("Hello, World!")
end

webio_serve(page("/", req -> myapp(req)))
```

This will serve a page at port 8000 that will render the object returned by `myapp` function.

On Atom, when you execute an expression that returns a WebIO object, it will be rendered in a separate pane.

An introduction to the DOM
--------------------------

To create UIs with WebIO, we need to create something called [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) objects. DOM stands for "Document Object Model", you can think of the DOM as an intermediate structure that represents the underlying HTML. So for example,

```html
<div class="myDiv" id="myId">
    Hello, World!
</div>
```

would be represented as:

```julia
dom"div"("Hello, World!", className="myDiv", id="myId")
```

In the DOM. This is of course, a virtual representation of the DOM in Julia. WebIO can take care of rendering that to the actual DOM inside a browser-based interface. (See setting up display section above to learn how to set up WebIO to display things)

Notice that in the HTML we used the `class` attribute, but we used `className` keyword argument while creating `Node`. This is because the DOM doesn't always closely resemble the HTML.

1. Keywords to `Node` are DOM *properties*
2. Properties are [sometimes different from HTML *attributes*](http://stackoverflow.com/questions/258469/what-is-the-difference-between-attribute-and-property)

Specifically, here, the `class` attribute reflects as the `className` property of the DOM, hence we set it thus. To explicitly set an attribute instead of a property, pass in the attributes keyword argument. It must be set to the Dict of attribute-value pairs.

For example,
```julia
dom"div"("Hello, World!", attributes=Dict("class"=>"myDiv"))
```

Another difference between HTML and DOM worth noting is in `style`

The purpose of `style` attribute or property is to define some [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) that gives some style to a DOM node. The `style` *property* is a dictionary mapping properties to values. Whereas the `style` attribute in HTML is a string containing the CSS of the style!

Therefore, `<div style="background-color: black; color: white"></div>` in HTML is equivalent to `dom"div"(style=Dict(:color=>white, :backgroundColor=>"black"))`. Hiphenated CSS properties like 'background-color' are camelCased in the DOM version.

### The `dom""` macro

The `dom""` [*string macro*](http://docs.julialang.org/en/release-0.4/manual/metaprogramming/#non-standard-string-literals) can be used to simplify the syntax of creating DOM Nodes. The syntax for the macro is:

```julia
dom"div.<class>#<id>[<attr>=<value>,...]"(children...; props...)
```

And is equivalent to:

```julia
Node(:div, children..., className="<class>", id="<id>",
     attributes=Dict(attr1=>val1, attr2=>val2...); props...)
```

Everything except the tag ('div' in the example) is optional. So,

`dom"div"`, `dom"div.class1"`, `dom"div.class1.class2"`, `dom"div#my-id`, `dom"input.check[type=checkbox]"` are all valid invocations.

WebIO.render
------------

WebIO exports `WebIO.render` generic function which can be extended to define how to render something into WebIO's DOM. Think of it as a better version of `show(io::IO, m::MIME"text/html", x)`.

For example, a TodoItem type like:

```julia
immutable TodoItem
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

A todo list would naturally contain a vector of `TodoItem`s and possibly a `title` field.

```julia
immutable TodoList
    title::String
    list::Vector{TodoItem}
end

mylist = TodoList("My todo list",
    [TodoItem("Make my first WebIO widget", false),
     TodoItem("Make a pie", false)])

```

The `render` method for `TodoList` can nest calls to render on `TodoItem`s.

```julia
function render(list::TodoList)
    dom"div"(
        dom"h2"(list.title),
        dom"div.todo-list"(
            map(render, list.items) # a vector of rendered TodoItems
        )
    )
end
```

## Executing JavaScript

Interaction with the DOM can be set up via event handlers. Event handlers can be set up by passing a dict as the `events` keyword argument to the `dom""` constructor. For example,

```julia
dom"button"("Greet",
     events=Dict("click" => js"function (event) { alert('Hello, World!') }"))
```

This will create a button which will show a dialog box with the message "Hello, World!" when clicked.

There are 2 ways of creating JavaScript expressions with WebIO.

First, you can use the `js""` string macro to just write any JavaScript as a string. For example

```
js"""
alert("Hello, World!")
"""
```

This will return an object of type `JSExpr` which can be used anywhere WebIO expects javascript expressions.

The second way is to use the `@js` macro. `@js` macro can translate Julia expressions to JavaScript expressions (`JSExpr`). For example,

```julia
@js alert("Hello, World!")
```

or

```julia
@js Math.rand()
```

The same example could have been written using `@js` like this:


```julia
dom"button"("Greet",
     events=Dict("click" => @js event -> alert("Hello, World!")))
```

Note that `@js` just translates a Julia expression to the equivalent JavaScript, it does not compile the code. The variables and functions you reference in a `@js` expression must be defined in the JavaScript context it will run in (and need not be defined in Julia).

## Loading JavaScript dependencies


You can load dependencies by creating a Widget object and passing in `dependencies` argument.

```julia
w = Widget(dependencies=["//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.js"])

ondependencies(w, @js function (p5)
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
w = Widget()
```

A widget object acts as a container for communication (more details below). To exchange values between JavaScript and Julia, we also need to add `Observable` objects to the widget. This can be done by passing the widget, and an identifier for the observable (as string) and a default value to the `Observable` constructor:

```julia
obs = Observable(w, "rand-value", 0.0)
```

You can get the value of `obs` with the syntax `obs[]`. You can set the value using the syntax `obs[] = val`. To listen to changes to the value you can use the `on` function.

```julia
on(f, obs)
```

This will run `f` on every update to `obs`.

### Sending values from JavaScript to Julia

Below is a widget which communicates with Julia. Let's run through its construction line-by-line. The following widget contains a button which sends a random number, generated in JavaScript, to Julia. We will print this number on the Julia side.

```julia
function random_print_button()
    w = Widget()

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

`w` is a Widget object, it acts a scope or context for communication. Every call to `random_print_button` will create a new widget and hence keep the updates contained within it. This allows there to be many instances of the same widget on a page.

An `Observable` is a value that can change over time. `Observable(w, "rand-value", 0.0)` creates an observable by the name "rand-value" associated with widget `w`. `on(f, x)` sets up an event handler such that `f` is called with the value of `x` every time `x` is updated.

An observable can be updated using the `x[] = value` syntax on Julia. To update the observable from the JavaScript side, you can use the following syntax:

```julia
@js $obs[] = Math.random()
```

This will return a `JSExpr` which you can use anywhere WebIO expects JavaScript, such as a event handler. But an event handler should be a function so you would need to enclose this in a function: `@js () -> $obs[] = Math.random()`.

```
  dom"button"(
    "generate random",
    events=Dict("click"=>@js () -> $obs[] = Math.random()),
  )
```
creates a button UI which updates the `obs` observable with `Math.random()` (executed in JS) on every click.

Notice the last expression actually _calls_ the widget `w` with the contents to display. This causes the contents to be _wrapped_ in `w`'s context. All uses of observables associated with `w` (e.g. `obs`) should be enclosed in the widget `w`.

### Sending values from Julia to JavaScript

Here's a clock where the time is formatted and updated every second from Julia. We use the `onjs` handler and mutate the `#clock` DOM element to acheive this.

```julia
w = Widget()
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

The javascript function passed to `onjs` gets the value of the update as the argument. `this` is set to the Widget object. Notice the use of `this.dom.querySelector("#clock")`. `this.dom` contains the rendered DOM of the widget. `querySelector("#<id>")` will look up the element which has the id `<id>`. `clock.textContent = val` will set the text contained in `clock`, the DOM element.

