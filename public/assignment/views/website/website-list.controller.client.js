(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController($routeParams, WebsiteService) {

        var vm = this;

        function init() {

            // Get userId of logged-in user
            vm.userId = $routeParams.uid;
            // Retrieve user's websites from WebsiteService
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){});

        }
        init();

    }

})();
