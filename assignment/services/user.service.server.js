module.exports = function (app) {

    // Switch to MongoDB later
    var users =
        [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];


    // api requests
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

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
        var username = req.body.username;
        var password = req.body.password;

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


    function updateUser(req, res) {
        // Argument is updated user object containing new attr's to be merged
        var updatedUser = req.body;

        // Know when to send res.send("0");
        var userFound = 0;

        // Check if new username is already taken before changing
        // Also check that the new username isn't just the same one
        //     (second part of if conditions)
        for (var u in users) {
            if (updatedUser.username === users[u].username
                && updatedUser._id != users[u]._id) {
                userFound = 1;
                res.send("Username already taken");
            }
        }

        // Otherwise, update the user object and return it
        for (var u in users) {
            if (updatedUser._id === users[u]._id) {
                users[u].username = updatedUser.username;
                users[u].firstName = updatedUser.firstName;
                users[u].lastName = updatedUser.lastName;
                userFound = 1;
                res.send(users[u]);
            }
        }

        // Otherwise, update fails
        if (userFound === 0) { res.send("0") }

    }


    function deleteUser (req, res) {
        // Delete user
        // res.send "1" for success "0" for failure
        var userId = req.params.uid;
        var userFound = false;
        for (var u in users) {
            if (users[u]._uid === userId) {
                users.splice(u, 1);
                userFound = true;
                res.send("1");
            }
        }
        if (! userFound) { res.send("0"); }
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