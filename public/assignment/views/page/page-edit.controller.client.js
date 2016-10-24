(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {

            // Get all pages in the website
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            console.log("Current pages");
            console.log(vm.pages);

            // Get particular page being edited
            vm.page = PageService.findPageById(vm.pageId);
            console.log("Current page:");
            console.log(vm.page);

            // Update page
            vm.updatePage = updatePage;
            function updatePage(name, description) {
                // Pass updatedPage to PageService.updatePage
                // Do not need complete attr's

                var updatedPage = {name: name, description: description};
                PageService.updatePage(vm.pageId, updatedPage);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }

            // Delete page
            vm.deletePage = deletePage;
            function deletePage (pageId) {
                PageService.deletePage(pageId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }

        }
        init();

    }

})();
