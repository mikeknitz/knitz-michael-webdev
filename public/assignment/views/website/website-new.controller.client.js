(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {

            // Get userId of logged-in user
            vm.userId = $routeParams.uid;

            // Grab user's websites from WebsiteService
            //     Use them to populate the left sidebar
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){});

            // Create new website using attr's from the view
            // Attr's don't need to be complete -> service merges them
            vm.createWebsite = createWebsite;
            function createWebsite() {
                // Create website with attr's to pass to WebsiteService.createWebsite
                var newWebsite = {
                    name: vm.name,
                    description: vm.description,
                    developerId: vm.userId
                };

                // Add newWebsite to database
                // Navigate to website list page
                WebsiteService.createWebsite(vm.userId, newWebsite)
                    .success(function(website){
                        console.log("Created new website");
                        console.log(website);
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function(){});


            }


        }
        init();


    }

})();
