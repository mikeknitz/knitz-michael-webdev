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



            // Retrieve list of pages for the website
            PageService.findPagesByWebsiteId(vm.websiteId)
                .success(function(pages){
                    console.log("Current pages:")
                    console.log(pages);
                    vm.pages = pages;
                })
                .error(function(){});





            // Create page button
            vm.createPage = createPage;
            function createPage() {
                // Send attr's to be merged into a new page
                //     _id will be created on the server

                var newPage = {
                    name: vm.name,
                    description: vm.description,
                    websiteId: vm.websiteId
                };

                PageService.createPage(newPage)
                    .success(function(page){
                        console.log("New page added to database:");
                        console.log(page);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function(){});
            }

        }
        init();

    }

})();
