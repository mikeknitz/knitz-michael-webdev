(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {

            // Find widget currently editing
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

            // Delete widget currently editing
            // Redirect to widget list
            vm.deleteWidget = deleteWidget;
            function deleteWidget() {
                WidgetService.deleteWidget(vm.widgetId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                              + "/page/" + vm.pageId + "/widget")
            }

            // Update widget
            // Depends on which widgetType the current widget is
            // Attr's aren't complete, they just merge with database
            vm.updateWidget = updateWidget;
            function updateWidget() {
                if (vm.widget.widgetType == "HEADER") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        size: vm.widget.size,
                        widgetType: "HEADER"
                    };
                }
                else if (vm.widget.widgetType == "IMAGE") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        url: vm.widget.url,
                        width: vm.widget.width,
                        widgetType: "IMAGE"
                    };
                }
                else if (vm.widget.widgetType == "YOUTUBE") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        url: vm.widget.url,
                        width: vm.widget.width,
                        widgetType: "YOUTUBE"
                    };
                }

                console.log(updatedWidget)
                WidgetService.updateWidget(vm.widgetId, updatedWidget);
                // Go back to widget list
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                    + "/page/" + vm.pageId + "/widget")

            }


        }
        init();

    }

})();
