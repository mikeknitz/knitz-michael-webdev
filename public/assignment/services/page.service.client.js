(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService() {

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

        function createPage(websiteId, page) {
            // Receives website page containing all attributes except _id and websiteId
            // Creates page and adds to database
            // Returns website with updated attributes

            // Set a unique _id for the website
            page._id = guid();
            // Set page.websiteId to the provided websiteId
            page.websiteId = websiteId;
            // Add to pages database
            pages.push(page);
            // Return the updated page
            return page;
        }

        function findPagesByWebsiteId(websiteId) {
            // Return array of all pages whose page.websiteId matches websiteId argument

            var website_pages = [];
            for (var p in pages) {
                var page = pages[p];
                if (page.websiteId == websiteId) {
                    website_pages.push(page);
                }
                return website_pages;
            }
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

            for (var p in pages) {
                var page_old = pages[p];
                if (page_old._id == pageId) {
                    $.extend(true, pages[p], page);
                    return pages[p];
                } else {
                    console.log("PageService.updatePage failed");
                }
            }
        }

        function deletePage(pageId) {
            // Delete page from database whose page._id matches argument pageId
            // Return true if successful

            for (var p in pages) {
                var page = pages[p];
                if (page._id == pageId) {
                    pages.splice(p, 1);
                    return true;
                } else {
                    console.log("PageService.deletePage failed");
                }
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
