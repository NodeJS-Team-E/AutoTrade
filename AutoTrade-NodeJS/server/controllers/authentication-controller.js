"use strict";

let passport = require("passport");
let notifier = require("../utilities/notifier");

module.exports = function(data) {
    return {
        login(req, res, next) {
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    notifier.error('Invalid name or password!')
                        /*res.json({
                            success: false,
                            message: 'Invalid name or password!'
                        });*/
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
        }
    }
};