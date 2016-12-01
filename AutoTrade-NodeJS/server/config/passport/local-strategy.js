'use strict';

const LocalStrategy = require('passport-local')

module.exports = function(passport, data) {
    const authStrategy = new LocalStrategy(
        function(username, password, done) {
            data.findByUsername(username)
                .then(user => {
                    user = user[0];
                    if (user && (user.password === password)) {
                        done(null, user);
                    } else {
                        // console.log(user.password);
                        // console.log(user.password);
                        // console.log(user.email);
                        done(null, false);
                    }
                })
                .catch(error => done(error, false));
        });

    passport.use(authStrategy);
}