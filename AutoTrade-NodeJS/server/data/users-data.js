/* globals Promise */
'use strict';
const encryption = require('../utilities/encryption');

module.exports = function(User) {
    function create(options) {
        const salt = encryption.generateSalt(),
            hashPass = encryption.generateHashedPassword(salt, options.password);

        const user = new User({
            username: options.username,
            email: options.email,
            pictureUrl: options.pictureUrl,
            phoneNumber: options.phoneNumber,
            salt: salt,
            password: options.password,
            hashPass: hashPass,
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

    function getUserById(id) {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: id }, (err, user) => {
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

    function updateUserImage(user, newImageUrl) {
        return new Promise((resolve, reject) => {
            User.update({
                _id: user._id
            }, {
                $set: {
                    pictureUrl: newImageUrl
                }
            }, (err, updatedUser) => {
                if (err) {
                    return reject(err);
                }

                return resolve(updatedUser);
            });
        });
    }

    function updateUserPhoneNumber(user, newPhoneNumber) {
        return new Promise((resolve, reject) => {
            User.update({
                _id: user._id
            }, {
                $set: {
                    phoneNumber: newPhoneNumber
                }
            }, (err, updatedUser) => {
                if (err) {
                    return reject(err);
                }

                return resolve(updatedUser);
            });
        });
    }

    function updateUser(user) {
        return new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }

    return {
        create,
        getUserById,
        findByUsername,
        all,
        updateUserImage,
        updateUserPhoneNumber,
        updateUser
    };
};