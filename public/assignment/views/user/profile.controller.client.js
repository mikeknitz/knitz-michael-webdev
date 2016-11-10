(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController(UserService, $routeParams, $location) {

        var vm = this;
        // Grab current user logged in
        vm.userId = parseInt($routeParams.uid);

        // Wrap in init()
        function init() {

            // Grab user from UserService
            // vm.user = UserService.findUserById(vm.userId);

            // Get user object
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function(user) {
                    if (user != "0") {
                        vm.user = user;
                    }
                })
                .error(function() {
                });

            // Function to update user with UserService.updateUser
            vm.updateUser = updateUser;
            function updateUser(username, firstName, lastName) {
                // calls UserService.updateUser with updatedUser with attr's from the view
                // updatedUser doesn't need to be complete since just new things are merged

                var updatedUser = {
                    username: username,
                    firstName: firstName,
                    lastName: lastName
                };

                UserService.updateUser(vm.user._id, updatedUser);
                // Reload page with new information
                $location.url("/user/" + vm.user._id);
            }

        }
        init();

    }

})();
