'use strict';

const config = require("../config/constants");
const models = require('../models')();
const data = require("../data")(config, models);

module.exports = {
    getCreateForm(req, res) {
        res.render("create-advert");
    },
    create(req, res) {
        let advert = req.body;
        //posted-by --> current user
        //adding the advert to the user profile also
        
        data.advertData.create(advert)
            .then(readyAdv => {
                if (readyAdv == null) {
                    return res.status(404)
                        .redirect("/error");
                }

                return res.render("adverts-list", {
                    result: readyAdv
                });
            }).catch(err => console.log(err));
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