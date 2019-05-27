# Extending WebIO

## Rendering Custom Objects
WebIO defines the [`WebIO.render`](@ref) function which can be extended to
render any Julia type into the DOM.
Think of it as a better version of `show(io::IO, m::MIME"text/html", x)` (where
the output is a tree of [`Node`](@ref)'s instead of an HTML string).

### Learning By Example
Suppose we want to teach WebIO how to render our to-do list type.
Given a `TodoItem` like
```julia
struct TodoItem
    description::String
    done::Bool
end
```
we might define a `render` method such as
```julia
function WebIO.render(todoitem::TodoItem)
    return dom"div.todo-item"(
        dom"input[type=checkbox]"(checked=todoitem.done),
        todoitem.description,
        style=Dict("display" => "flex", "flex-direction" => "horizontal"),
    )
end
```

If we have a to-do list that looks like
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
we can define `render` as
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
