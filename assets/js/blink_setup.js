(function (Blink) {
    if (Blink.sock) {
        WebDisplay.triggerConnected();
        WebDisplay.sendCallback = function (msg) {
            Blink.msg("webdisplay", msg);
        }
    } else {
        console.error("Blink not connected")
    }

    Blink.handlers.webdisplay = function (msg) {
        WebDisplay.dispatch(msg.data);
    };
})(Blink);
