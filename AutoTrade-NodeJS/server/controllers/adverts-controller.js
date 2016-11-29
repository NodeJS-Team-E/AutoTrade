'use strict';

const config = require("../config/constants");
const models = require('../models')();
const data = require("../data")(config, models);

module.exports = {
    getCreateForm(req, res) {
        res.render("create-advert");
    },
    create(req, res) {
        let vehicle = {
            category: req.body.category,
            manufactureDate: req.body.year,
            fuelType: req.body.fuelType,
            shiftGear: req.body.transmission,
            mileage: req.body.mileage,
            price: req.body.price,
            color: req.body.color,
            vehiclePicture: req.body.picture
        }
        data.vehicleData.create(vehicle)
            .then(vehicle => {
                let advert = {
                    title: req.body.title,
                    description: req.body.description,
                    vehicle: vehicle,
                    location: req.body.location,
                    postedBy: req.body.postedBy,
                    comments: req.body.comments
                        //wrap it in an array??
                }
                return new Promise((resolve, reject, error) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(advert)
                })
            }).then(advert => {
                data.advertData.create(advert)
                    .then(advert => {
                        if (advert == null) {
                            console.log("Advert not created");
                            return res.status(404)
                                .redirect("/error");
                        }
                        res.redirect("/home");
                    }).catch(err => console.log(err));
            });




        //posted-by --> current user
        //adding the advert to the user profile also


    },
    getAll(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.render("adverts-list", {
                    result: adverts
                });
            }).catch((err) => console.log(err));
    },

    getById(req, res) {
        data.advertData.getAdvertById(req.params.id)
            .then(advert => {
                if (advert === null) {
                    return res.status(404)
                        .redirect("/error");
                }

                return res.render("advert-details", {
                    result: advert
                });
            });
    }



}