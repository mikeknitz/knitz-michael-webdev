module.exports = function (app) {

    // Move to MongoDB later
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];


    // api requests
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.post("/api/website/:wid/page", createPage);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage)

    function findPagesByWebsiteId(req, res) {
        // Receive websiteId and return all pages that match
        var websiteId = req.params.wid;

        // Populate an array for matching pages
        var pages_matching = [];
        for (var p in pages) {
            var page = pages[p];
            if (page.websiteId === websiteId) {
                pages_matching.push(page);
            }
        }
        res.send(pages_matching);
    }

    function createPage(req, res) {
        // Receives new page (including its websiteId) to be added to database
        // Must add _id to the page
        // Returns the page object back

        var newPage = req.body;
        var websiteId = req.params.wid;

        newPage._id = guid();
        pages.push(newPage);
        res.send(newPage);

    }

    function findPageById(req, res) {
        // Receives pageId and returns the matching page
        var pageId = req.params.pid;

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageId) {
                res.send(page);
            }
        }
    }

    function updatePage(req, res) {
        // Receives updatedPage to merge
        // Merges into database
        // Returns updated page
        var updatedPage = req.body;
        var pageId = req.params.pid;

        for (var p in pages) {
            var page_db = pages[p];
            if (page_db._id === pageId) {
                page_db.name = updatedPage.name;
                page_db.description = updatedPage.description;
                res.send(page_db);
            }
        }

    }

    function deletePage(req, res) {
        // Receives pageId
        // Deletes it from database
        // Returns a "1" if successful
        var pageId = req.params.pid;

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageId) {
                pages.splice(p, 1);
                res.send("1");
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

};