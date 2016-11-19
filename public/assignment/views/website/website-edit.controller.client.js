(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        function init() {

            // Get userId of logged-in user
            vm.userId = $routeParams.uid;

            // Retrieve user's websites from WebsiteService
            //     This will populate the left sidebar
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){});

            // Retrieve website being edited
            //     Will populate right panel with details
            vm.websiteId = $routeParams.wid;
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function(website){
                    vm.website = website;
                    console.log("Website being edited:");
                    console.log(website);
                })
                .error(function(){});

            vm.updateWebsite = updateWebsite;
            function updateWebsite() {

                // Details to be passed to updatedWebsite()
                var updatedWebsite = {
                    _id: vm.website._id,
                    name: vm.website.name,
                    description: vm.website.description
                };

                WebsiteService.updateWebsite(updatedWebsite)
                    .success(function(website){
                        console.log("Updated website:");
                        console.log(website);
                        // Once website is updated, go back to list of websites
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function(){});

            };

            vm.deleteWebsite = deleteWebsite;
            // function deleteWebsite(websiteId) {
            //     WebsiteService.deleteWebsite(websiteId);
            // }

            function deleteWebsite() {
                WebsiteService.deleteWebsite(vm.website._id)
                    .success(function(){
                        console.log("Deleted website");
                        $location.path("/user/" + vm.userId + "/website");
                    })
                    .error(function(){});
            }



        }
        init();

    }

})();
