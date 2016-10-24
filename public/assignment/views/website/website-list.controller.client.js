(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService) {

        var vm = this;

        function init() {

            // Get userId of logged-in user
            vm.userId = parseInt($routeParams.uid);
            // Grab user's websites from WebsiteService
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            console.log("Current websites:");
            console.log(vm.websites);

        }
        init();

    }

})();
