(function (Blink) {
    if (Blink.sock) {
        WebIO.triggerConnected();
        WebIO.sendCallback = function (msg) {
            Blink.msg("webdisplay", msg);
        }
    } else {
        console.error("Blink not connected")
    }

    Blink.handlers.webdisplay = function (msg) {
        WebIO.dispatch(msg.data);
    };
})(Blink);
