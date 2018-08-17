(function () {
    function wsurl() {
        var loc = window.location, new_uri;
        if (loc.protocol === "https:") {
                new_uri = "wss:";
        } else {
                new_uri = "ws:";
        }
        new_uri += "//" + loc.host;
        new_uri += loc.pathname;
        return new_uri;
    }

    function tryconnect(url) {
        if (url.substring(url.length - 1, url.length) !== "/") {
            url += "/"
        }
        var ws = new WebSocket(url + "webio-socket");
        ws.onopen = function () {
            WebIO.sendCallback = function (msg) {
                ws.send(JSON.stringify(msg))
            }

            ws.onmessage = function (evt) {
                WebIO.dispatch(JSON.parse(evt.data));
            }

            WebIO.triggerConnected()
        }
        ws.onclose = function (evt) {
            if (evt.code === 1005) {
                // no status code recv -- happens when 404
                url = url.replace(/\/+$/, "")
                url = url.match(/.*\//)[0]; // dirname
                url = url.replace(/\/+$/, "")
                if (url === "http:" || url === "https:") {
                    // we tried everything!
                    return
                } else {
                    tryconnect(url)
                }
            }
        }
    }

    tryconnect(wsurl())
})();
