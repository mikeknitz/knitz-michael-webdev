(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        // $routeprovider from ngRoute module
        .config(function ($routeProvider) {
            $routeProvider


                // User pages
                .when("/", {
                    templateUrl: "views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/user/register.view.client.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/user/:uid", {
                    templateUrl: "views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })


                // Website pages
                .when("/user/:uid/website", {
                    templateUrl: "views/website/website-list.view.client.html",
                    controller: "WebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/new", {
                    templateUrl: "views/website/website-new.view.client.html",
                    controller: "WebsiteController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid", {
                    templateUrl: "views/website/website-edit.view.client.html",
                    controller: "WebsiteController",
                    controllerAs: "model"
                })

                // Website --> Page pages
                .when("/user/:uid/website/:wid/page", {
                    templateUrl: "views/page/page-list.view.client.html",
                    controller: "PageController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/new", {
                    templateUrl: "views/page/page-new.view.client.html",
                    controller: "PageController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid", {
                    templateUrl: "views/page/page-edit.view.client.html",
                    controller: "PageController",
                    controllerAs: "model"
                })


                // Website --> Page --> Widget pages
                .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl: "views/widget/widget-list.view.client.html",
                    controller: "WidgetController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                    templateUrl: "views/widget/widget-choose.view.client.html",
                    controller: "WidgetController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                    templateUrl: "views/widget/widget-edit.view.client.html",
                    controller: "WidgetController",
                    controllerAs: "model"
                })


                .otherwise({
                    redirectTo: "/"
                });
        });
})();
