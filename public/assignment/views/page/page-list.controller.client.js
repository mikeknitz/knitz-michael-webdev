(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {

            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            console.log("Current pages");
            console.log(vm.pages);

        }
        init();

    }

})();
