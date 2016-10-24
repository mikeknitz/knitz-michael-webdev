(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService)

    function WebsiteService() {

        // Hard-coded website list --> Use MongoDB later
        var websites = [
              { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
              { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
              { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
              { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
              { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
              { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

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
            // Receives website containing all attributes except _id and developerId
            // Creates website and adds to database
            // Returns website with updated attributes

            // Set a unique _id for the website
            website._id = guid();
            // Set developerId to the userID
            website.developerId = userId;
            // Add to websites database
            websites.push(website);
            // Return updated website
            return website;
        }

        function findWebsitesByUser(userId) {
            // Returns array of all websites for website.developerId == userId
            var user_websites = [];
            for (var w in websites) {
                var website = websites[w];
                if (website.developerId == userId) {
                    user_websites.push(website);
                }
                return user_websites;
            }
        }

        function findWebsiteById(websiteId) {
            // Return website whose _id matches websiteId argument
            for (var w in websites) {
                var website = websites[w];
                if (website._id == websiteId) {
                    return website;
                }
            }
        }

        function updateWebsite(websiteId, website) {
            // Merge argument website into websites.website
            // Return updated website

            for (var w in websites) {
                var website_old = websites[w];
                if (website_old._id == websiteId) {
                    $.extend(true, websites[w], website);
                } else {
                    console.log("WebsiteService.updateWebsite failed")
                }
            }

        }

        function deleteWebsite(websiteId) {
            // Delete website from database whose website._id matches websiteId
            // Return true if successful

            for (var w in websites) {
                var website = websites[w];
                if (website._id == websiteId) {
                    websites.splice(w, 1);
                    return true;
                } else {
                    console.log("WebsiteService.deleteWebsite failed")
                }
            }
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
