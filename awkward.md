- `render(x)` seems like a bigass hijack of the word
- FunctionalCollections dependency
- Allowing Context creation to wait on JS dependency loading makes:
  - Context creation async
  - And by extension node creation async
  - context.dom no longer can be a DOM node
  - it will be a tree of promises

- Possible solution: Create a Node{X} where X means creation of children and siblings must be deferred. # or just have Context be this thing
- the Whole node gets a deferred callback which notifies a condition on Julia side when all the deferred children are finished rendering.


Event handlers on nodes called by the creation lifecycle:
  onNodeCreation
  onContextCreation - called when all children and siblings are done being created

Julia side can then be sure that
- contex.dom will be present when we try to deal with it
- no reason for messages to be dropped

Can we have a stack of surfaces?

then display(surface, x) defaulting to display(stack[end], x)

What does it mean to be a surface? --- It's actually just a context? display(...) just translates to a `send` :createNode ?
