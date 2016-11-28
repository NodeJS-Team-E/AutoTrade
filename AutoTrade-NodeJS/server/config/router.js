'use strict';
let homeController = require("../controllers/home-controller");
let advertsController = require("../controllers/adverts-controller");
let router = require("express").Router();

module.exports = app => {
    router.get("/", (req, res) => {
        res.redirect("/home");
    });
    router.get("/home", homeController.getHome)
        .get("/adverts", advertsController.getAll)
        .get("/adverts/:id", advertsController.getById);


    app.use(router);
}