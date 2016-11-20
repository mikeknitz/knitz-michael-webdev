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

            WidgetService.findWidgetById(vm.widgetId)
                .success(function(widget){
                    console.log("Editing widget:");
                    console.log(widget);
                    vm.widget = widget;
                })
                .error(function(){});

            // Delete widget currently editing
            // Redirect to widget list after
            vm.deleteWidget = deleteWidget;
            function deleteWidget() {

                WidgetService.deleteWidget(vm.widgetId)
                    .success(function(response){
                        if (response === "1") {
                            console.log("Widget deleted");
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                                + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(){});

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
