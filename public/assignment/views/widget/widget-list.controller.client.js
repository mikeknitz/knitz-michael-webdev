(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {

            // Get all widgets for the current page
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function(widgets){
                    console.log("Current widgets:");
                    console.log(widgets);
                    vm.widgets = widgets;
                })
                .error(function(){});

        }
        init();

    }

})();
