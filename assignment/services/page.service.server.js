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