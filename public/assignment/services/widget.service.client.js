(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    function WidgetService() {

        // Hard-coded widget list --> Use MongoDB later
        var widgets = [
          { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
          { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
          { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
          { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
          { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
          { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
          { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        // API for controllers to use
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetByPageId: findWidgetByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            // Receives page widget containing all attributes except _id and pageId
            // Creates widget and adds to database
            // Returns widget with updated attributes

            // Set a unique _id for the widget
            widget._id = guid();
            // Set widget.pageId to provided pageId
            widget._pageId = pageId;
            // Add to widgets database
            widgets.push(widget);
            // Return the updated widget
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            // Return array of all widgets whose widget.pageId matches pageId argument

            var page_widgets = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId == pageId) {
                    page.widgets.push(widget)
                }
                return page_widgets;
            }
        }

        function findWidgetByPageId(widgetId) {
            //  Return widget whose widget._id matches argument widgetId

            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id == widgetId) {
                    return widget;
                }
            }
        }

        function updateWidget(widgetId, widget) {
            // Merge argument widget into database widget

            var widgetFound = false;
            for (var w in widgets) {
                var widget_old = widgets[w];
                if (widget_old._id == widgetId) {
                    widgetFound = true;
                    $.extend(true, widgets[w], widget);
                    return widgets[w];
                }
            }
            if (! widgetFound) {
                console.log("WidgetService.updateWidget failed");
            }
        }

        function deleteWidget(widgetId) {
            // Delete widget from database whose widget._id matches argument widgetId
            // Return true if successful

            var widgetFound = false;
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id == widgetId) {
                    widgetFound = true;
                    widgets.splice(w, 1);
                    return true;
                }
            }
            if (! widgetFound) {
                console.log("WidgetService.deleteWidget failed");
            }
        }

        function guid() {
            // Create guid to use for new widgets
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

    }
})();
