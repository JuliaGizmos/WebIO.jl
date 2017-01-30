WebIO User Guide
=====================

WebIO is a framework for building interactive widgets with Julia and JavaScript. It provides a common abstraction for displaying and interacting with content in:

- [IJulia](https://github.com/JuliaLang/IJulia.jl) - Jupyter notebooks for Julia
- [Juno](http://junolab.org) - The hottest Julia IDE
- [Blink](https://github.com/JunoLab/Blink.jl) - An [Electron](http://electron.atom.io/) wrapper you can use to make Desktop apps
- [Mux](https://github.com/JuliaWeb/Mux.jl) - A web server framework

Widgets once created with WebIO will work on any of these front-ends. See [setting up display](#Setting-up-dispaly) section below for initial setup required for each of these front-ends.

Setting up WebIO
---------------------

To install WebIO, run:

```julia
Pkg.clone("https://github.com/shashi/WebIO.jl.git")
```

### Setting up display

First load the front end package (e.g. Blink or Mux; IJulia and Atom packages are already loaded when you are using them). Then run `using WebIO` to load this package. Finally, run `setup_provider` function with the appropriate argument for the front end.

- On **IJulia**
```julia
setup_provider("ijulia")
```
Now whenever a code cell returns a `WebIO.Node` object (read on to learn how to create them), IJulia will render it correctly. For example,

```julia
In[*]: dom"div"("Hello, World") # returns a WebIO.Node object
```

- On **Blink**
```julia
setup_provider("blink")
```

To display a WebIO Node, you can just pass it to `body!` of a window. For example,

```julia
w = Blink.Window()
body!(w, dom"div"("Hello, World"))
```

- On **Mux**
```julia
setup_provider("mux")
```

To display a WebIO Node, just return it from a web app function.

```julia
function myapp(req)
    Node(:div, "Hello, World!")
end

wdserve(page("/", req -> myapp(req)))
```

Introduction
------------

The rest of the document describes the WebIO API. To illustrate the various affordances of WebIO, we will use a Todo list app as a running example.

Presumably, a todo item would need to store at least two fields: a `discription`, and a boolean `done` indicating whether the task is completed or not.

```julia
immutable TodoItem
    description::String
    done::Bool
end
```

A todo list would naturally contain a vector of `TodoItem`s and possibly a `title` field.

```julia
immutable TodoList
    title::String
    list::Vector{TodoItem}
end
```

The `TodoItem` and `TodoList` types together can represent the state of our todo app. For example,

```julia
mylist = TodoList("My todo list",
    [TodoItem("Make my first WebIO widget", false),
     TodoItem("Make a pie", false)])

```

In web framework jargon the these types together would be called the `Model` (as in [Model-View-Controller](https://en.wikipedia.org/wiki/Model_view_controller)) of the app.

Let's start building the pieces we require for a todo list UI using WebIO.

An introduction to the DOM
--------------------------

We need a way to convert our app state to something a web browser can render. For this purpose WebIO lets you create the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) of the output. DOM stands for "Document Object Model", you can think of the DOM as an intermediate structure that represents the underlying HTML. So for example,

```html
<div class="myDiv" id="myId">
    Hello, World!
</div>
```

would be represented as:

```julia
Node(:div, "Hello, World!", className="myDiv", id="myId")
```

WebIO can then render this DOM `Node` object in different interfaces. (See setting up display section above to learn how to set up WebIO to display things)

Notice that in the HTML we used the `class` attribute, but we used `className` keyword argument while creating `Node`. This is due to 2 reasons:

1. Keywords to `Node` are *properties*
2. Properties are [sometimes different from HTML *attributes*](http://stackoverflow.com/questions/258469/what-is-the-difference-between-attribute-and-property)

Specifically, here, the `class` attribute reflects as the `className` property of the DOM, hence we set it thus. To explicitly set an attribute instead of a property, pass in the attributes keyword argument. It must be set to the Dict of attribute-value pairs.

For example,
```julia
Node(:div, "Hello, World!", attributes=Dict("class"=>"myDiv"))
```

Another difference between HTML and DOM worth noting is in `style`

The purpose of `style` attribute or property is to define some [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) that gives some style to a DOM node. The `style` *property* is a dictionary mapping properties to values. Whereas the `style` attribute in HTML is a string containing the CSS of the style!

Therefore, `<div style="background-color: black; color: white"></div>` in HTML is equivalent to `Node(:div, style=Dict(:color=>white, :backgroundColor=>"black"))`. Hiphenated CSS properties like 'background-color' are camelCased in the DOM version.

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

`dom"div"`, `dom"div.class1"`, `dom"div.class1.class2"`, `dom"div#my-id`,
`dom"input.check[type=checkbox]"` are all valid invocations.

### Showing a todo item

Let's come back to our example of creating a todo list app with our newfound knowledge of how to create some output with WebIO.


WebIO defines a `render` generic function. The purpose of `render` is to define how any Julia object can be rendered to something WebIO can display. Hence, we should define how elements of our Todo app are rendered by adding [methods](http://docs.julialang.org/en/release-0.4/manual/methods/) to `render`. First, the TodoItem:

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

Let's see how this renders:

```julia
render(TodoItem("Make my first WebIO widget", true))
```

The render function can also be thought of as a template. An HTML version of this template might look like:

```html
<div style="display:flex; flex-direction: horizontal">
    <input type="checkbox" checked={{todoitem.done}}>
    {{todoitem.description}}
</div>
```

Second, we define how a TodoList is rendered:

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

```julia
mylist = TodoList("My todo list",
    [TodoItem("Make my first WebIO widget", false),
     TodoItem("Make a pie", false)])

render(mylist)
```
