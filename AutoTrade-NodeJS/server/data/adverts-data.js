/* globals Promise */
'use strict';

const userModel = require("../models/user-model");

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

    function findByLocation(options) {
        let location = options.location;
        return new Promise((resolve, reject) => {
            Advert.find({ 'location': location }, (err, advert) => {
                //console.log(advert);
                if (err) {
                    return reject(err);
                }
                return resolve(advert);
            })
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

    function getAdvertByVehicleIds(idArr) {
        let promise = new Promise((resolve, reject) => {
            Advert.find({ 'vehicle': { $in: idArr } }).populate('vehicle').populate("postedBy")
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    // console.log(res);
                    return resolve(res);
                });
        })

        return promise;
    }

    function addCommentToAdvert(id, content, author) {
        return new Promise((resolve, reject) => {
            let comment = {
                content,
                author: { name: author.name }
            };

            Advert.findByIdAndUpdate(id, { $push: { comments: comment } },
                (err, advert) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(advert);
                }
            );
        });
    }




    return {
        create,
        findByTitle,
        findByLocation,
        all,
        getAdvertById,
        getAllAdvertsWithPagination,
        updateAdvert,
        getAdvertByVehicleIds,
        addCommentToAdvert

    };
};