(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        // Login functionality for login.view.client.html
        function login(username, password) {
            // Grab user object from database
            var user = UserService.findUserByCredentials(username, password);
            // Throw error if credentials invalid
            if (! user) { vm.error = "Invalid credentials"; }
            //  Navigate to user page
            else { $location.url("/user/" + user._id) }
        }

    }

})();
