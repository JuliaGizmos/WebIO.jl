# Messaging

One of the core components of WebIO is the messaging infrastructure.
For most users of WebIO, it's sufficient to just use the functions that build on
this messaging infrastructure (such as updating observables and using `evaljs`).
For more details, keep reading.

WebIO supports two messaging paradigm (_command_ and _request/response_ which
are described below).

## Communication Model
WebIO's communication model is relatively simple, but complicated by the fact
that `Scope`s may have zero or more connections.

From the frontend perspective, communication is one-to-one (Julia talks to the
frontend and the frontend talks to Julia).
From the Julia perspective, however, communication is one-to-many (Julia talks
to many frontends simultaneously).

One-to-one communication from Julia can be achieved by communicating with a
single connection instead of communicating through scopes.
<!-- TODO: document how to talk to a single connection -->

## Command Messages
Command messages are _fire-and-forget_.
They can be sent to a [`Scope`](@ref) or a single
[connection](@ref AbstractConnection).
If sent to a scope, WebIO guarantees that every open connection will receive the
update.

### "Lost" Commands
When using `Scope`-based communication, WebIO does **not** guarantee that a command will be received if there are no active frontends (_i.e._, if there are no connections to the `Scope`).
This results in a "lost" command that is never actually executed on a frontend.

This is typically an important consideration when one wishes to send commands immediately after a scope has been created (as it is likely that the scope will not have been setup on the frontend by the time the command is send).

#### Example (`evaljs` Race Condition)
Consider the following code illustrating this.
```julia
# Setup a complex Scope
scope = Scope(dom=...)

# Display the Scope to a frontend(s)
display(scope)

# We can try to send commands to the Scope...
evaljs(scope, js"console.log('Hello, world!');")

# But theres a race condition where its likely that we will send the evaljs
# command before the scope has been setup in the frontend. This means there will
# be no active connections for the scope and the evaljs message will be silently
# dropped.
```

In this particular case, if we need to evaluate some JavaScript when creating
the scope, we should add a callback using `onmount` or `onimport`.
This is not exactly equivalent to the example above because the callback will be
executed every time the `Scope` mounts (which may potentially be multiple times
depending on how many times its displayed or if it's otherwise unmounted and
re-mounted).

```julia
scope = Scope(dom=...)
onmount(scope, js"console.log('hello')")
display(scope)
```

## Request/Response Messages
Requests can be sent by either the frontend or Julia,

## IJulia Pitfalls
WebIO has first-class support for IJulia and Jupyter Notebook/Jupyter Lab.
Unfortunately, the architecture of Jupyter imposes a few constraints that must
be kept in mind when doing bidirectional communication with IJulia.

The [Jupyter protocol](https://jupyter-client.readthedocs.io/en/stable/messaging.html) specifies multiple types of messages.
In particular, there are _code execution_ messages and _comm_ messages and these messages must be handled in sequence.
This makes sense since we want code cells to be run sequentially instead of in parallel.
However, WebIO uses _comm_ messages to communicate, which means that it is impossible for an IJulia-based frontend to send messages to Julia while a _code execution_ request is being handled.

This results in race conditions and deadlocks if one is not careful.
Suppose we had the following in a single code cell in Jupyter.
```julia
# Construct the scope putting whatever interactive content we want in it
s = Scope(dom=...)

# Display the scope to Jupyter
display(s)

# Wait for a connection to be established
wait(s)
```

The code looks relatively straightforward and innocuous, but causes a deadlock that requires the IJulia kernel to be interrupted or restarted.
The sequence events is as follows.
1. The code cell is submitted to the kernel (this is a _code execution_ message for IJulia).
1. IJulia adds the _code execution_ message to its message queue.
1. IJulia pops from the queue (assuming there is not already a request in progress) and begins handling our code.
1. We construct the `Scope` and send it the frontend.
1. We wait for active connections.
1. The scope is setup in the Jupyter frontend and the frontend sends a `setup_scope` command using a Jupyter _comm_ message.
1. IJulia adds the _comm_ message to its message queue.

This results in deadlock.
* IJulia won't handle the _comm_ message (the `setup_scope` command) until `wait(s)` returns.
* `wait(s)` won't return until a connection is established (which happens after receiving the `setup_scope` command from the frontend).

Importantly, this is an issue inherent with the Jupyter protocol, not a fault of IJulia.
There is an [open issue](https://github.com/jupyter/jupyter_client/issues/433) against the Jupyter protocol to consider adding a way to asynchronously execute _comm_ messages but its unlikely to change in the immediate future.

#### Solution
The _solution_ to the problem above is to run any code that needs bidirectional communication with an IJulia frontend in an asynchronous task (since this does not block the IJulia message processing queue).

```julia
s = Scope(dom=...)
display(s)

@async begin
    wait(s)
    evaljs(s, js"console.log('hello!')")
end
```
