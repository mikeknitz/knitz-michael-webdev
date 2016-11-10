module.exports = function (app) {

    var users =
        [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];


    // api requests
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById)
    app.post("/api/user", createUser)

    // GET request contains either username and password or just username
    //     Logic in this function passes it to appropriate function
    //     Either way, user object is passed back in the promise
    //------------------------------------------------------------------------------
    function findUser(req, res) {
        var query = req.query;
        // When both parameters are present
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }
    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }
    //------------------------------------------------------------------------------





    function findUserById(req, res) {
        // Req url "/api/user/:uid"
        // Send back the user object or "0"
        var userId = req.params.uid;
        for (var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }


    function createUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        // First check if username is already taken
        for (var u in users) {
            if (users[u].username === username) {
                res.send("0");
            }
        }

        // Otherwise, add an _id and push to users array
        // Send back the user object
        var user = {
            username: username,
            password: password,
            _id: guid()
        };
        users.push(user);
        console.log("user added to database");
        res.send(user);
    }



    function guid() {
        // Create guid to use for new users
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

};