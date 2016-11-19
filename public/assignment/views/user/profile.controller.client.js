(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController(UserService, $routeParams, $location) {

        var vm = this;
        // Grab current user logged in
        vm.userId = $routeParams.uid;

        // Wrap in init()
        function init() {

            // Get user object
            UserService.findUserById(vm.userId)
                .success(function(user) {
                    if (user != "0") {
                        vm.username = user.username;
                        vm.firstName = user.firstName;
                        vm.lastName = user.lastName;
                    } else {
                        vm.error = "User not found";
                    }
                })
                .error(function() {
                });

            // Function to update user with UserService.updateUser
            vm.updateUser = updateUser;
            function updateUser() {
                // calls UserService.updateUser with updatedUser with attr's from the view
                // updatedUser doesn't need to be complete since just new things are merged

                var updatedUser = {
                    username: vm.username,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    _id: vm.userId
                };

                UserService.updateUser(updatedUser)
                    .success(function(user){
                        if (user === "Username already taken") {
                            vm.error = "Username already taken";
                            vm.success = null;
                        } else if (user === "0") {
                            vm.error = "Update failed";
                            vm.success = null;
                        } else {
                            $location.url("/user/" + user._id);
                            vm.error = null;
                            vm.success = "User successfully updated";
                            console.log(user);
                        }
                    })
                    .error(function(){});
                // Reload page with new information
                $location.url("/user/" + vm.userId);
            }

        }
        init();

    }

})();
