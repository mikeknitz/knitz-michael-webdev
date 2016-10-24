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


        function createUser(user) {}
        function findUserById(userId) {}
        function findUserByUsername(username) {}
        function findUserByCredentials(username, password) {
            // Iterate through users, return matching user object
            for (var u in users) {
                var user = users[u];
                if (   user.username === username
                    && user.password === password) {
                    return user;
                }
            }
        }
        function updateUser(userId, user) {}
        function deleteUser(userId) {}

    }

})();