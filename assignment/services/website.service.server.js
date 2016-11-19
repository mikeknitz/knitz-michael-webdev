module.exports = function (app) {

    // Switch to MongoDB later
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    // api requests

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function findWebsitesByUser(req, res) {
        // Returns array of all websites for the user
        var userId = req.params.uid;
        // Empty array for the websites
        var user_websites = [];
        for (var w in websites) {
            var website = websites[w];
            if (website.developerId === userId) {
                user_websites.push(website);
            }
        }
        res.send(user_websites);
    }

    function createWebsite(req, res) {
        // Receive new website and add it to database
        // Return object for newWebsite
        //     object will have its newly created _id

        var userId = req.params.uid;
        var newWebsite = req.body;
        // Unique _id for website
        newWebsite._id = guid();
        // Add to database
        websites.push(newWebsite);
        res.send(newWebsite);
    }

    function findWebsiteById(req, res) {
        // Receive websiteId
        // Return matching website
        var websiteId = req.params.wid;
        for (var w in websites) {
            var website = websites[w];
            if (website._id === websiteId) {
                res.send(website);
            }
        }
    }

    function updateWebsite(req, res) {
        // Receive updated website
        // Merge argument website into database website
        // Return updated website
        var website_new = req.body;
        var websiteId = req.params.wid;

        for (var w in websites) {
            var website_db = websites[w];
            if (website_db._id === websiteId) {
                // At some point try to put in functionality like $.extend
                //     but for now update will be manual assignment
                website_db.name        = website_new.name;
                website_db.description = website_new.description;
                res.send(website_db);
            }
        }
    }

    function deleteWebsite(req, res) {
        // Receive website id
        // Delete website from database

        var websiteId = req.params.wid;
        for (var w in websites) {
            var website = websites[w];
            if (website._id === websiteId) {
                websites.splice(w, 1);
                res.send("1")
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
