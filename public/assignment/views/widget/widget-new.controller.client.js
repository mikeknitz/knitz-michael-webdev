(function () {
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
                // Create widget_new object and send to WidgetService
                var widget_new = {
                    widgetType: widgetType,
                    pageId : vm.pageId
                };
                WidgetService.createWidget(widget_new)
                    .success(function (widget_new) {
                        console.log("Created new widget:");
                        console.log(widget_new);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                            + "/page/" + vm.pageId + "/widget/" + widget_new._id);
                    })
                    .error(function () {
                    });


            }

        }

        init();

    }

})
();
