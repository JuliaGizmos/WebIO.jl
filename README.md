# WebDisplay

**Interactive web-based displays for Julia objects.**

Works inside IJulia, Blink, Escher and Atom.

Packages that need interactivity such as PlotlyJS, Patchwork, Reactive can use the `WebIO` type for talking to their display in the web interface.

## The `WebIO` type

The `WebIO` type contains:

- `handle(w::WebIO)`: A handle that can be used to talk with the output
- `setrequires!(w::WebIO, files::Array)`: Set up JS/CSS/HTML includes used by the display. See [asset management].
- `WebIO.io`: This is where the initial HTML output should be written to.

### Functions for Interfaces to override

- `webdisplay_send(::Backend, data::Any)`: Send a command (serialize and send). Should call `WebIO.recv` on the client side with the dict
- `webdisplay_recv(::Backend, data::Any)`:  Receive a message from a backend. Should override to send messages to the right channel.

## `show(::WebIO, m::MIME, x::MyType)`

## `Handle`

## Displaying and updating output

### 

## Adding interaction with JavaScript

### Functions for Interfaces to implement

BlinkWebIOHandler = {
  recv: function () {
    WebIO.dispatch(msg);
  },
  send: function (cmd, msg, objid) {
    if (objid == undefined) {
       CustomEvent(ev);
    }

    blinkwebsock.send({"objid" => id, chd => "command", {})
  }
}

WebIO.init(BlinkWebIOHandler);
