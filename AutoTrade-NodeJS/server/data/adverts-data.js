/* globals Promise */
'use strict';

module.exports = function(Advert) {
    function create(options) {
        const advert = new Advert({
            title: options.title,
            description: options.description,
            vehicle: options.vehicle,
            location: options.location,
            postedBy: options.postedBy,
            comments: options.comments,
        });

        return new Promise((resolve, reject) => {
            advert.save((err) => {
                if (err) {
                    return reject(err);
                }
                Advert.findOne({ _id: advert._id })
                    .populate("vehicle")
                    .exec((err, advert) => {
                        if (err) {
                            console.log(`Population error: {err}`);
                        }
                        return resolve(advert);
                    })
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

    function findByLocation(location) {
        return new Promise((resolve, reject) => {
            Advert.find({ location }, (err, vehicle) => {
                if (err) {
                    return reject(err);
                }

                return resolve(vehicle);
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
        findByLocation,
        all,
        getAdvertById

    };
};