(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController)

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {

            // Create widget
            // Specify which type in the view so the right attr's can be added
            vm.createWidget = createWidget;
            function createWidget(widgetType) {
                // Send newWidget with widgetType set to WidgetService.createWidget
                var newWidget = {widgetType: widgetType};
                console.log("newWidget:");
                console.log(newWidget);
                var widget = WidgetService.createWidget(vm.pageId, newWidget);
                console.log("new widget is:");
                console.log(widget);
                console.log("new widgets array is:");
                console.log(WidgetService.findWidgetsByPageId(vm.pageId));
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                               + "/page/" + vm.pageId + "/widget/" + widget._id);
            }

        }
        init();

    }

})();
