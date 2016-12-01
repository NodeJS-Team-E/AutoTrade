"use strict";

let passport = require("passport");
let notifier = require("../utilities/notifier");

module.exports = function(data) {
    return {
        register(req, res) {
            let user = {
                username: req.body.username,
                email: req.body.email,
                pictureUrl: req.body.pictureUrl,
                phoneNumber: req.body.phoneNumber,
                salt: req.body.salt,
                password: req.body.password,
                hashPass: req.body.hashPass,
                messages: [],
                adverts: []
            };
            data.userData.create(user)
                .then(dbUser => {
                    res.status(201)
                        .redirect('/login');
                })
                .catch(err => res.status(500).json(err));
        },

        login(req, res, next) {
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    notifier.error('Invalid name or password!')
                    res.redirect("/login");
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect("/profile");

                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            notifier.success('Logged out!');
            res.status(200).redirect('/home');
        }
    }
};