(function () {
    var ws = new WebSocket("/wdsocket");
    WebDisplay.sendCallback = function (msg) {
        ws.send(JSON.stringify(msg))
    }
    ws.onmessage = function (evt) {
        console.log("MESSAGE RECEIVED", evt.data);
        WebDisplay.dispatch(evt.data);
    }
)();
