(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {

        var vm = this;

        function init() {

            vm.register = register;

            function register(username, password, verifyPassword) {
                if (password != verifyPassword) {
                    vm.error = "Passwords do not match";
                } else {
                    var newUser = {username: username, password: password};
                    vm.user = UserService.createUser(newUser);
                    if(! vm.user) {
                        vm.error = "Username already taken";
                    }
                    $location.url("/user/" + vm.user._id);
                }
            }

        }
        init();

    }

})();
