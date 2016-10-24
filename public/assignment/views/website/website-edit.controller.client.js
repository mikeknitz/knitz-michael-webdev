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

            // Grab user's websites from WebsiteService
            // This will populate the left sidebar even though we are editing just one
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            console.log("Current websites:");
            console.log(vm.websites);

            // Get website being edited
            vm.websiteId = $routeParams.wid;
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            console.log("Website being edited:");
            console.log(vm.website);

            vm.updateWebsite = updateWebsite;
            function updateWebsite(websiteName, websiteDescription) {
                // Update website using settings from view
                // updatedWebsite doesn't need complete attr's since they are just merged

                var updatedWebsite = {
                    name: websiteName,
                    description: websiteDescription
                };

                WebsiteService.updateWebsite(vm.website._id, updatedWebsite);
                $location.url("/user/" + vm.userId + "/website/" + vm.website._id);

            };

            vm.deleteWebsite = deleteWebsite;
            function deleteWebsite(websiteId) {
                WebsiteService.deleteWebsite(websiteId);
                $location.path("/user/" + vm.userId + "/website");
            }

        }
        init();

    }

})();
