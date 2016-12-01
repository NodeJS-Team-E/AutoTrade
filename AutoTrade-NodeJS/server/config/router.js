'use strict';
let homeController = require("../controllers/home-controller");
let advertsController = require("../controllers/adverts-controller");
let userController = require("../controllers/users-controller");

let createAuthController = require("../controllers/authentication-controller");
//const data = require('../models/user-model');

//TODO these requires should not be here
const myUser = require('../models/user-model');
const createUserData = require('../data/users-data');
const userData = createUserData(myUser);
const authController = createAuthController(userData);
//-------------------------------------------------

let router = require("express").Router();



module.exports = app => {
    router.get("/", (req, res) => {
        res.redirect("/home");
    });
    router
        .get("/home", homeController.getHome)
        .get("/adverts", advertsController.getAll)
        .get("/adverts/:id", advertsController.getById)
        .get("/create-advert", advertsController.getCreateForm)
        .post("/create-advert", advertsController.create)
        .get("/login", userController.getLoginForm)
        .post("/login", authController.login)
        .get("/register", userController.getRegisterForm)
        .post("/register", authController.register)
        .get("/profile", userController.getProfile)
        .get("/unauthorized", userController.getUnauthorized);

    app.use(router);
}