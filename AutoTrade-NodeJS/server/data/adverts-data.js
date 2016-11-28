/* globals Promise */
'use strict';

module.exports = function(Advert) {
    function create(options) {
        const advert = new Advert({
            title: options.title,
            description: options.description,
            vehicle: options.vehicle,
            postedBy: options.postedBy,
            comments: options.comments,
        });

        return new Promise((resolve, reject) => {
            advert.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(advert);
            });
        });
    }

    function findByTitle(title) {
        return new Promise((resolve, reject) => {
            Advert.find({ title }, (err, advert) => {
                if (err) {
                    return reject(err);
                }

                return resolve(advert);
            });
        });
    }

    function getAdvertById(id) {
        return new Promise((resolve, reject) => {
            Advert.findOne({ _id: id }, (err, advert) => {
                if (err) {
                    return reject(err);
                }

                return resolve(advert);
            });
        });
    }

    function all() {
        return new Promise((resolve, reject) => {
            Advert.find((err, users) => {
                if (err) {
                    return reject(err);
                }

                return resolve(users);
            });
        });
    }

    return {
        create,
        findByTitle,
        all,
        getAdvertById

    };
};