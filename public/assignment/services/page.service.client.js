(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService($http) {

        // Hard-coded page list --> Use MongoDB later
        var pages = [
              { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
              { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
              { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

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
            // Return page whose page._id matches argument pageId

            for (var p in pages) {
                var page = pages[p];
                if (page._id == pageId) {
                    return page;
                }
            }
        }

        function updatePage(pageId, page) {
            // Merge argument page into database page
            // Return updated website

            var pageFound = false;
            for (var p in pages) {
                var page_old = pages[p];
                if (page_old._id == pageId) {
                    $.extend(true, pages[p], page);
                    pageFound = true;
                    return pages[p];
                }
            }
            if (! pageFound) {
                console.log("PageService.updatePage failed")
            }
        }

        function deletePage(pageId) {
            // Delete page from database whose page._id matches argument pageId
            // Return true if successful

            var pageFound = false;
            for (var p in pages) {
                var page = pages[p];
                if (page._id == pageId) {
                    pages.splice(p, 1);
                    pageFound = true;
                    return true;
                }
            }
            if (! pageFound) {
                console.log("PageService.deletePage failed");
            }
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
