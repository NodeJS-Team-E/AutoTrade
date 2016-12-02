'use strict';
const config = require("./constants"),
    models = require("../models")(),
    data = require("../data/index")(config, models),
    advertsController = require("../controllers/adverts-controller")(data),
    authController = require("../controllers/authentication-controller")(data),
    userController = require("../controllers/users-controller"),
    homeController = require("../controllers/home-controller"),
    router = require("express").Router();

module.exports = app => {
    router.get("/", (req, res) => {
        res.redirect("/home");
    });
    router
        .get("/home", homeController.getHome)
        .get("/search", homeController.getAdvancedSearch)
        .get("/adverts", advertsController.getAll)
        .get("/adverts/:id", advertsController.getById)
        .get("/create-advert", advertsController.getCreateForm)
        .post("/create-advert", advertsController.create)
        .get("/login", userController.getLoginForm)
        .post("/login", authController.login)
        .get("/register", userController.getRegisterForm)
        .post("/register", authController.register)
        .get("/logout", authController.logout)
        .get("/profile", userController.getProfile)
        .get("/about", (req, res) => {
            res.render("about", {
                user: req.user
            })
        })
        .get("/unauthorized", userController.getUnauthorized);

    app.use(router);
}