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
                    vm.currentImage = widget.path + ".jpg";
                    if (! widget.path) {
                        vm.currentImage = "http://i.imgur.com/0lQP3wW.png";
                    }
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
                if (vm.widget.widgetType === "HEADER") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        size: vm.widget.size,
                        widgetType: "HEADER",
                        _id: vm.widgetId
                    };
                }
                else if (vm.widget.widgetType === "IMAGE") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        url: vm.widget.url,
                        width: vm.widget.width,
                        widgetType: "IMAGE",
                        _id: vm.widgetId
                    };
                }
                else if (vm.widget.widgetType === "YOUTUBE") {
                    var updatedWidget = {
                        pageId: vm.pageID,
                        name: vm.widget.name,
                        text: vm.widget.text,
                        url: vm.widget.url,
                        width: vm.widget.width,
                        widgetType: "YOUTUBE",
                        _id: vm.widgetId
                    };
                }

                // Update widget
                // Navigate back to widget list
                WidgetService.updateWidget(updatedWidget)
                    .success(function(widget_updated){
                        console.log("Updated. New Widget:");
                        console.log(widget_updated);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                            + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function(){});

            }


        }
        init();

    }

})();
