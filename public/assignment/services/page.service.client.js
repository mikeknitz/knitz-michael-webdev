(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService($http) {

        // var pages = [
        //       { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //       { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //       { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        // ];

        // API for controllers to use
        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(newPage) {
            var url = "/api/website/"+newPage.websiteId+"/page";
            return $http.post(url, newPage);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(updatedPage, pageId) {
            var url = "/api/page/"+pageId;
            return $http.put(url, updatedPage);
        }

        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            return $http.delete(url);
        }

        function guid() {
            // Create guid to use for new pages
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
