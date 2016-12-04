/* globals Promise */
'use strict';

module.exports = function(Advert) {
    function create(options) {
        let advert = new Advert({
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

    function addComment(id, settings) {
        return new Promise((resolve, reject) => {
            Advert.findOne({ _id: id })
                .then(advert => {
                    advert.comments.push(settings);

                    advert.save();
                    return resolve(advert);
                }).catch(err => reject(err));
        });
    }

    function sortByNewlyCreated() {
        let promise = new Promise((resolve, reject) => {
            Advert.find().sort({ 'postedOn': -1 }).populate('vehicle').populate("postedBy")
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    // console.log(res);
                    return resolve(res);
                });
        });
        return promise;
    }

    function getAdvertByVehicleIds(idArr) {
        let promise = new Promise((resolve, reject) => {
            Advert.find({ 'vehicle': { $in: idArr } })
                .populate('vehicle').populate("postedBy")
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
        })

        return promise;
    }

    return {
        create,
        findByLocation,
        all,
        getAdvertById,
        getAllAdvertsWithPagination,
        addComment,
        sortByNewlyCreated,
        getAdvertByVehicleIds

    };
};