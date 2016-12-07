module.exports = function(app) {

    // Hard-coded widget list --> Use MongoDB later
    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345",
            "widgetType": "IMAGE",
            "pageId": "321",
            "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678",
            "widgetType": "YOUTUBE",
            "pageId": "321",
            "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.post("/api/page/:pid/widget", createWidget);
    app.delete("/api/widget/:wid", deleteWidget);
    app.get("/api/widget/:wid", findWidgetById);
    app.put("/api/widget/:wid", updateWidget);
    app.put("/api/page/:pid/widget", sortWidgets);

    function findWidgetsByPageId(req, res) {
        // Receive pageId
        // Return array of all matching widget objects
        var pageId = req.params.pid;

        var widgets_match = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget.pageId === pageId) {
                widgets_match.push(widget);
            }
        }
        res.send(widgets_match);
    }

    function createWidget(req, res) {
        // Receives new widget object and adds to database
        // Need to add an _id for each one
        // Returns new widget object
        var widget_new = req.body;

        widget_new._id = guid();
        widgets.push(widget_new);
        res.send(widget_new);
    }

    function deleteWidget(req, res) {
        // Delete widget from database using widgetId
        // Return "1" if successful
        var widgetId = req.params.wid;

        for (var w in widgets) {
            widget = widgets[w];
            if (widget._id === widgetId) {
                widgets.splice(w, 1);
                res.send("1");
            }
        }

    }

    function findWidgetById(req, res) {
        // Return widget with matching widgetId
        var widgetId = req.params.wid;

        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                res.send(widget);
            }
        }
    }

    function updateWidget(req, res) {
        // Receive updatedWidget object
        // Merge properties into db object
        // Return updated object
        var widget_updated = req.body;
        // node.extend
        var extend = require("node.extend");

        for (var w in widgets) {
            var widget_db = widgets[w];
            if (widget_db._id === widget_updated._id) {
                widgets[w] = extend(true, widgets[w], widget_updated);
                res.send(widgets[w]);
            }
        }
    }

    function sortWidgets(req, res) {
        // Receive pageId and starting and final index for a widget within a page
        // Update the index of the widget
        var pageId = req.params.pid;
        var start = req.query.initial;
        var final = req.query.final;

        // TODO: use widget model stuff to reorder here

    }

    function guid() {
        // Create guid to use for new users
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}