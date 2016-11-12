(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController(UserService, $location) {
        var vm = this;

        function init() {

            vm.login = login;

            // Login functionality for login.view.client.html
            function login(username, password) {
                // Grab user object from database
                // It will actually be a promise
                UserService.findUserByCredentials(username, password)
                    .success(function (user){
                        if (user === "0") {
                            // Throw error if credentials invalid
                            vm.error = "Invalid credentials";
                        } else {
                            //  Navigate to user page
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function (){
                    })
            }

        }
        init();

    }

})();
