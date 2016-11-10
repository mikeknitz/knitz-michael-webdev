(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {

        var vm = this;

        function init() {

            vm.register = register;

            function register() {
                // Error if passwords do not match
                if (vm.password != vm.verifyPassword) {
                    vm.error = "Passwords do not match";
                } else {
                    var newUser = {username: vm.username, password: vm.password};
                    // POST request
                    // Either username taken or navigate to new profile page
                    UserService.createUser(newUser)
                        .success(function(user){
                            if (user === "0") {
                                vm.error = "Username already taken";
                            } else {
                                $location.url("/user/"+ user._id)
                            }
                        })
                        .error(function(){});
                }
            }

        }
        init();

    }

})();
