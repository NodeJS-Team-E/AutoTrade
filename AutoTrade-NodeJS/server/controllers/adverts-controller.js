'use strict';
module.exports = function(data) {
    function getCreateForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        res.render("adverts/create-advert", {
            user: req.user
        });
    }

    function create(req, res) {
        console.log(req.user);
        //posted-by --> current user
        //adding the advert to the user profile also
        let vehicle = {
            price: req.body.price,
            category: req.body.category,
            manufacturer: req.body.manufacturer,
            fuelType: req.body.fuelType,
            transmission: req.body.transmission,
            manufactureDate: req.body.year,
            color: req.body.color,
            mileage: req.body.mileage,
            vehiclePicture: req.body.picture
        }
        data.vehicleData.create(vehicle)
            .then(vehicle => {
                let advert = {
                    title: req.body.title,
                    description: req.body.description,
                    vehicle: vehicle,
                    location: req.body.location,
                    postedBy: req.user,
                    comments: req.body.comments
                        //wrap it in an array??
                }

                data.advertData.create(advert)
                    .then(advert => {
                        console.log(advert);
                        if (advert == null) {
                            console.log("Advert not created");
                            return res.status(404)
                                .redirect("/error");
                        }
                        res.redirect("/home");
                    }).catch(err => console.log(err));
            });
    }

    function getAll(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.render("adverts/adverts-list", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    function getAllAdvertsJSON(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.json({ adverts });
            });
    }

    function getById(req, res) {
        data.advertData.getAdvertById(req.params.id)
            .then(advert => {
                if (advert === null) {
                    return res.status(404)
                        .redirect("/error");
                }

                return res.render("adverts/advert-details", {
                    advert: advert,
                    user: req.user
                });
            });
    }

    function getByIdJSON(req, res) {
        data.advertData.getAdvertById(req.params.id)
            .then(advert => {
                if (advert === null) {
                    return res.status(404)
                        .redirect("/error");
                }

                return res.json({ advert });

            });
    }

    return {
        getCreateForm,
        create,
        getAll,
        getById,
        getAllAdvertsJSON,
        getByIdJSON

    }
}