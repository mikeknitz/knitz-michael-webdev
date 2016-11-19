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


            // Retrieve list of pages for the website
            PageService.findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    console.log("Current pages:")
                    console.log(pages);
                    vm.pages = pages;
                })
                .error(function(){});



        }
        init();

    }

})();
