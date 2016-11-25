/* globals Promise */
'use strict';
const encryption = require('../utilities/encryption');

module.exports = function(User) {
    function create(options) {

        const user = new User({
            username: options.username,
            email: options.email,
            pictureUrl: options.pictureUrl,
            phoneNumber: options.phoneNumber,
            salt: encryption.generateSalt(),
            password: options.password,
            hashPass: encryption.generateHashedPassword(this.salt, this.password),
            messages: options.messages,
            adverts: options.adverts
        });

        return new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }

    function findByUsername(username) {
        return new Promise((resolve, reject) => {
            User.find({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }

    function all() {
        return new Promise((resolve, reject) => {
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }

                return resolve(users);
            });
        });
    }

    return {
        create,
        findByUsername,
        all
    };
};