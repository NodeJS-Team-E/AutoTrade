'use strict';
const config = require("./constants"),
    models = require("../models")(),
    data = require("../data/index")(config, models),
    advertsController = require("../controllers/adverts-controller")(data),
    authController = require("../controllers/authentication-controller")(data),
    userController = require("../controllers/users-controller")(data),
    messageController = require("../controllers/messages-controller")(data),
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
        .get("/users/:username", userController.getProfile)
        .get("/profile", userController.getProfile)
        .get("/update-profile", userController.getUpdateForm)
        .post("/update-profile", userController.updateProfile)
        .get("/about", (req, res) => {
            res.render("noplacetogo/about", {
                user: req.user
            })
        })
        .get("/send-message/:username", messageController.getCreateForm)
        .post("/send-message/:username", userController.receiveMessage)
        .get("/messages", userController.getMessages)
        .get("/unauthorized", userController.getUnauthorized);

    app.use(router);
}