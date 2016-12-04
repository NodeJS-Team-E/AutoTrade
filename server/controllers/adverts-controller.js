'use strict';
module.exports = data => {
    function getAdvertCreateForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        res.render("adverts/create-advert", {
            user: req.user
        });
    }

    function create(req, res) {
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
                    postedOn: req.body.postedOn,
                    postedBy: req.user,
                    comments: req.body.comments
                }

                data.advertData.create(advert)
                    .then(advert => {
                        if (advert == null) {
                            console.log("Advert not created");
                            return res.status(500)
                                .redirect("/error");
                        }

                        let settings = advert;
                        data.userData.addAdvert(req.user._id, settings);
                        res.redirect("/home");
                    }).catch(err => res.status(500).json(err));
            });
    }

    function getAllAdverts(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.render("adverts/adverts-list", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => res.status(404).json(err));
    }

    function getAdvertById(req, res) {
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

    function addComment(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        let comment = {
            username: req.user.username,
            content: req.body.comment
        }
        data.advertData.addComment(req.params.id, comment);
        //going back to the page
        res.status(200).redirect("back");
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

    function getAllAdvertsJSON(req, res) {
        data.advertData.all()
            .then(adverts => {
                res.json({ adverts });
            });
    }

    function listNewest(req, res) {
        data.advertData.sortByNewlyCreated()
            .then(adverts => {
                res.render("home/home", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    return {
        getAdvertCreateForm,
        create,
        getAllAdverts,
        getAdvertById,
        addComment,
        getByIdJSON,
        getAllAdvertsJSON,
        listNewest

    }
}