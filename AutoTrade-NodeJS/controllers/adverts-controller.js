'use strict';
module.exports = data => {
    function getCreateForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("unauthorized");
        }
        res.render("create-advert", {
            user: req.user
        });
    }

    function create(req, res) {
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
                    postedBy: req.body.postedBy,
                    comments: req.body.comments
                        //wrap it in an array??
                }

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
    }

    function getAll(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.render("adverts-list", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    function getById(req, res) {
        data.advertData.getAdvertById(req.params.id)
            .then(advert => {
                if (advert === null) {
                    return res.status(404)
                        .redirect("/error");
                }

                return res.render("advert-details", {
                    advert: advert,
                    user: req.user
                });
            });
    }

    return {
        getCreateForm,
        create,
        getAll,
        getById

    }
}