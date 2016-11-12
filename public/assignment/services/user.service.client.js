(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService)

    function UserService($http) {

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
            // Parameter user from controller
            //     User object only includes username and password attributes
            //     Server does the check if username is taken

            // Otherwise, return a POST request
            // Request returns new user object added in the promise
            var url = "/api/user?username="+user.username+"&password="+user.password;
            return $http.post(url);
        }

        function findUserById(userId) {
            // Send request to the api, return a promise
            // Promise contains user object or "0"
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            // // Iterate through users array and check if username matches user.username
            // // Return the user if found
            //
            // for (var u in users) {
            //     var user = users[u];
            //     if (user.username === username) {
            //         return user;
            //     }
            // }

            // Return GET request for the user object
            return $http.get("/api/user?username=" + username)

        }

        function findUserByCredentials(username, password) {
            // // Iterate through users, return matching user object
            // // Return the user if found
            //
            // for (var u in users) {
            //     var user = users[u];
            //     if (   user.username === username
            //         && user.password === password) {
            //         return user;
            //     }
            // }

            // Send request to the api, return a promise
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function updateUser(updatedUser) {
            // Merge argument user into database user
            // Return updated user

            // var userFound = false;
            // for (var u in users) {
            //     var user_old = users[u];
            //     if (user_old._id == parseInt(userId)) {
            //         $.extend(true, users[u], user);
            //         userFound = true;
            //         return users[u];
            //     }
            // }
            // if (! userFound) {
            //     console.log("UserService.updateUser failed")
            // }

            // Pass updatedUser object to server api
            // Returns user object in promise if successful
            var url = "/api/user/" + updatedUser._id;
            return $http.put(url, updatedUser);
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