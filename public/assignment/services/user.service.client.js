(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService)

    function UserService() {

        // Hard-coded set of users for now --> MongoDB database later
        var users =
            [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];


        // API for controllers to use
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;


        function createUser(user) {
            // Receives user from controller with user.username and user.password
            // Adds new user to database if username not already taken

            // If user.username already taken --> error
            if (findUserByUsername(user.username)) {
                console.log("Username already taken");
            }
            // Otherwise, push user to users array and add an id
            else {
                user._id = guid();
                users.push(user)
                console.log("user added to database")
                return user;
            }
        }

        function findUserById(userId) {
            // Iterate through users array and check if userId matches user._id
            // Return the user if found

            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    return user;
                }
            }
        }

        function findUserByUsername(username) {
            // Iterate through users array and check if username matches user.username
            // Return the user if found

            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
        }

        function findUserByCredentials(username, password) {
            // Iterate through users, return matching user object
            // Return the user if found

            for (var u in users) {
                var user = users[u];
                if (   user.username === username
                    && user.password === password) {
                    return user;
                }
            }
        }

        function updateUser(userId, user) {
            // Merge argument user into database user
            // Return updated user

            var userFound = false;
            for (var u in users) {
                var user_old = users[u];
                if (user_old._id == parseInt(userId)) {
                    $.extend(true, users[u], user);
                    userFound = true;
                    return users[u];
                }
            }
            if (! userFound) {
                console.log("UserService.updateUser failed")
            }

        }

        function deleteUser(userId) {
            // Delete users.user with matching userId
            // Return true if successful

            var userFound = false;
            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    users.splice(u, 1);
                    userFound = true;
                    return true;
                }
            }
            if (! userFound) {
                console.log("UserService.deleteUser failed");
            }
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

    }

})();