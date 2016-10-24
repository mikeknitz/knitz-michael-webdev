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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            console.log("Current widgets:");
            console.log("vm.widgets");

        }
        init();

    }

})();
