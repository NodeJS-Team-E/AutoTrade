'use strict';

const passport = require('passport'),
    userData = require('../../data/users-data');

passport.serializeUser((user, done) => {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser((userId, done) => {
    userData
        .findById(userId)
        .then(user => done(null, user || false))
        .catch(error => done(error, false));
});

require('./local-strategy')(passport, userData);

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
};