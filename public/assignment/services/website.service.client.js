(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

    function WebsiteService($http) {

        // var websites = [
        //       { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //       { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //       { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //       { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //       { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //       { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        // ];

        // API for controllers to use
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website)
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(updatedWebsite) {
            var url = "/api/website/"+updatedWebsite._id;
            return $http.put(url, updatedWebsite);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);

        }

        function guid() {
            // Create guid to use for new websites
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

    }
})();
