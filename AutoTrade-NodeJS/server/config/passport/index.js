"use strict";
const passport = require("passport");

const config = require("../../config/constants");
const models = require('../../models')();
const data = require("../../data")(config, models);


module.exports = app => {
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((userId, done) => {
        data.userData.getUserById(userId)
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });

    require("./local-strategy")(passport, data.userData);

    app.use(passport.initialize());
    app.use(passport.session());
};