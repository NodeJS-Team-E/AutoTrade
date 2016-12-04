'use strict'

let notifier = require("../utilities/notifier");

module.exports = function(data) {
    return {
        getAllUsers(req, res) {
            data.userData.all()
                .then(users => {
                    if (users) {
                        res.status(200).render("users/all-users", {
                            users: users,
                            user: req.user
                        });
                    } else {
                        res.status(404).redirect("/error");
                    }

                })
        },

        getLoginForm(req, res) {
            res.status(200).render("users/login");
        },

        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).render("noplacetogo/unauthorized");
            } else if (Object.keys(req.params).length == 0) {
                const user = req.user;
                res.status(200).render("users/profile", { user: user });
            } else {
                const otherUsername = req.params.username;
                data.userData.findByUsername(otherUsername)
                    .then((otherUser) => {
                        otherUser = otherUser[0];
                        if (!otherUser) {
                            notifier.error("No such user");
                            return res.status(400).redirect('/home');
                        }
                        return res.status(200).render("users/otherUsersProfile", {
                            otherUser: otherUser,
                            user: req.user
                        });
                    }).catch((err) => res.status(500).redirect('/unauthorized'));
            }
        },

        getUnauthorized(req, res) {
            res.send(res.render("noplacetogo/unauthorized"));
        },

        getRegisterForm(req, res) {
            res.status(200).render("users/register");
        },

        getUpdateForm(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).render("noplacetogo/unauthorized");
            }
            res.render("users/update-profile", {
                user: req.user
            });
        },

        updateProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).render("noplacetogo/unauthorized");
            }

            let user = req.user;
            let settings = {
                email: req.body.newEmail,
                phoneNumber: req.body.newPhone,
                pictureUrl: req.body.newPicture,
                adverts: [req.body.adverts]
            }
            data.userData.updateUser(user._id, settings);
            res.status(200).redirect("/profile");
        },

        getAllUsersJSON(req, res) {
            data.userData.all()
                .then(users => {
                    res.json({ users });
                });
        },

        getUsersByIdJSON(req, res) {
            data.userData.getUserById(req.params.id)
                .then(user => {
                    res.json({ user });
                });
        }
    }
}