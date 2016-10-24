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
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {}
        function findPageByWebsiteId(websiteId) {}
        function findPageById(pageId) {}
        function updatePage(pageId, page) {}
        function deletePage(pageId) {}

    }
}
