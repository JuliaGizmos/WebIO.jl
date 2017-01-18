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
        WebDisplay.triggerConnected(ws);
    }
    WebDisplay.sendCallback = function (msg) {
        ws.send(JSON.stringify(msg))
    }
    ws.onmessage = function (evt) {
        //console.log("MESSAGE RECEIVED", evt.data);
        WebDisplay.dispatch(JSON.parse(evt.data));
    }
})();
