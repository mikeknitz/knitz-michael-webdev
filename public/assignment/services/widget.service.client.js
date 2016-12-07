(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService)

    function WidgetService($http) {

        // API for controllers to use
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
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

        function sort(pageId, start, end) {
            var url = "/api/page/" + pageId + "/widget/?initial="
            + start + "&final=" + end;
            return $http.put(url);
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
