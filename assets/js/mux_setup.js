(function () {
    function wsurl(suffix) {
        var loc = window.location, new_uri;
        if (loc.protocol === "https:") {
                new_uri = "wss:";
        } else {
                new_uri = "ws:";
        }
        new_uri += "//" + loc.host;
        new_uri += loc.pathname + "/wdsocket";
        return new_uri;
    }

    var ws = new WebSocket(wsurl("/wdsocket"));
    ws.onopen = function () {
        WebIO.triggerConnected();
    }
    WebIO.sendCallback = function (msg) {
        ws.send(JSON.stringify(msg))
    }
    ws.onmessage = function (evt) {
        WebIO.dispatch(JSON.parse(evt.data));
    }
})();
