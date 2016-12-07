(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    function WidgetService($http) {

        // var widgets = [
        //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     {
        //         "_id": "345",
        //         "widgetType": "IMAGE",
        //         "pageId": "321",
        //         "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"
        //     },
        //     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     {
        //         "_id": "678",
        //         "widgetType": "YOUTUBE",
        //         "pageId": "321",
        //         "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E"
        //     },
        //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];

        // API for controllers to use
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(widget_new) {
            var url = "/api/page/"+widget_new.pageId+"/widget";
            return $http.post(url, widget_new);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(updatedWidget) {
            var widgetId = updatedWidget._id;
            var url = "/api/widget/" + widgetId;
            return $http.put(url, updatedWidget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
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
