# Getting Started

## Installing WebIO
WebIO is installed just like any other Julia package.
```julia
using Pkg
Pkd.add("WebIO")
using WebIO
```
Make sure to watch for any errors during the build process;
WebIO does its best to install everything to the right location, but sometimes
it can't find all the right things (especially for Jupyter).
If you get any warnings, please file an issue on GitHub.

## Displaying to a Frontend
First, load the appropriate frontend (e.g. Jupyter or Blink or Atom/Juno).
For simplicity, Jupyter is recommended while you're getting started.

### Jupyter
In a Julia Jupyter notebook (either via the classic notebook interface or in
JupyterLab), any WebIO content is automagically rendered into the browser.
For example, try displaying a paragraph.
```julia
In[*]: node(:p, "Hello, Jupyter")
```

### Blink
Blink is a Julia interface for [Electron](https://electronjs.org/) (a way to
write desktop apps using web technologies).
WebIO content can be displayed in a Blink window using the `body!` function.

```julia
using Blink
w = Window()
body!(w, dom"p"("Hello, Blink!"))
```

### Mux
Return a WebIO [`Node`](@ref Node) from a web app to render it.
Use [`webio_serve`](@ref WebIO.webio_serve) to serve the application.


```julia
function myapp(req)
    return node(:p, "Hello, Mux!")
end

webio_serve(page("/", req -> myapp(req)))
```

### Generic HTTP
```julia
# Create your own display function
function Base.display(d::MyWebDisplay, m::WebIO.WEBIO_APPLICATION_MIME, app)
    println(d.io, "outer html")
    # Calling show will make sure a server is running and serves dependencies
    # from AssetRegistry and a websocket connection gets established.
    show(d.io, m, app) #<- prints the html + scripts webio needs to work into io
    println(d.io, "close outer html")
end
```

### Juno
WebIO nodes should be automatically rendered when displayed.

## Composing Content
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

Checkout out the [`Node`](@ref Node) reference for more information.
