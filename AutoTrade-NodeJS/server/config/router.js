'use strict';
let homeController = require("../controllers/home-controller");
let router = require("express").Router();

module.exports = app => {
    router.get("/", (req, res) => {
        res.redirect("/home");
    });
    router.get("/home", homeController.getHome);

    app.use(router);
}