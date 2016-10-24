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
            // This will populate the left sidebar
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            console.log("Current websites");
            console.log(vm.websites);

            // Create new website using attr's from the view
            // Attr's don't need to be complete -> service merges them
            vm.createWebsite = createWebsite;
            function createWebsite(name, description) {
                // Create website with attr's to pass to WebsiteService.createWebsite
                var newWebsite = {name: name, description: description};
                WebsiteService.createWebsite(vm.userId, newWebsite);
                $location.url("/user/" + vm.userId + "/website");
            }


        }
        init();


    }

})();
