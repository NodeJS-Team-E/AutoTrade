/* globals Promise */
'use strict';

module.exports = function(Advert) {
    function create(options) {
        const advert = new Advert({
            title: options.title,
            description: options.description,
            vehicle: options.vehicle,
            location: options.location,
            postedOn: options.postedOn,
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
                    .populate("postedBy")
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
            }).populate('vehicle').populate("postedBy");
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
            Advert.find((err, adverts) => {
                if (err) {
                    return reject(err);
                }

                return resolve(adverts);
            }).populate('vehicle').populate("postedBy");
        });
    }

    function getAllAdvertsWithPagination(pageNumber = 0, pageSize = 5) {
        const getPage = new Promise((resolve, reject) => {
            Advert.find()
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .exec((err, adverts) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(adverts);
                });
        });

        const getCount = new Promise((resolve, reject) => {
            Advert.count((err, size) => {
                if (err) {
                    return reject(err);
                }

                const pageCount = Math.ceil(size / pageSize);
                return resolve(pageCount);
            });
        });

        return Promise.all([
            getPage,
            getCount
        ]);
    }

    function updateAdvert(advert) {
        return new Promise((resolve, reject) => {
            advert.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(advert);
            });
        });
    }

    return {
        create,
        findByTitle,
        findByLocation,
        all,
        getAdvertById,
        getAllAdvertsWithPagination,
        updateAdvert

    };
};