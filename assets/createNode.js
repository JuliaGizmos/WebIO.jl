(function () {
    function createNode(data) {
        var nodeType = data.class[1];
        return node_types[nodeType].create(data)
    }
})();

/**
 * create -> different types of nodes
 *
 **/
