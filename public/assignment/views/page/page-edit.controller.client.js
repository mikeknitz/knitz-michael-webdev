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

            // Retrieve list of pages for the website
            PageService.findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    console.log("Current pages:")
                    console.log(pages);
                    vm.pages = pages;
                })
                .error(function(){});

            // Get particular page being edited
            PageService.findPageById(vm.pageId)
                .success(function(page){
                    console.log("Currently editing page:");
                    console.log(page);
                    vm.page = page;
                })
                .error(function(){});


            // Update page
            vm.updatePage = updatePage;
            function updatePage() {

                // Attr's to merge
                var updatedPage = {
                    name: vm.page.name,
                    description: vm.page.description
                };
                PageService.updatePage(updatedPage, vm.pageId)
                    .success(function(page){
                        console.log("Updated page:");
                        console.log(page);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function(){});

            }



            // Delete page
            vm.deletePage = deletePage;

            function deletePage () {
                PageService.deletePage(vm.pageId)
                    .success(function(response){
                        console.log("Page deleted");
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function(){});
            }

        }
        init();

    }

})();
