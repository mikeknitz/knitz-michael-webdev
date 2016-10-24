(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("LoginController",    LoginController)

    function LoginController($location) {
        var vm = this;
        vm.hello = "hello from login controller";
    }

})();
