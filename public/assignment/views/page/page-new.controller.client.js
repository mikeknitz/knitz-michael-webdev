(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {

            // Get all pages in the website
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            console.log("Current pages");
            console.log(vm.pages);

            // Create new page using attr's from the view
            // Attr's don't need to be complete -> service merges them
            vm.createPage = createPage;
            function createPage(name, description) {
                // Create page with attr's to pass to PageService.createPage
                var newPage = {name: name, description: description};
                PageService.createPage(vm.websiteId, newPage);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
            }

        }
        init();

    }

})();
