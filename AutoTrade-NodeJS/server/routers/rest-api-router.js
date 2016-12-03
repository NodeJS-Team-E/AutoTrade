'use strict';
const express = require("express");
let Router = express.Router;
const config = require("../config/constants"),
    models = require("../models")(),
    data = require("../data/index")(config, models),
    advertsController = require("../controllers/adverts-controller")(data),
    usersController = require("../controllers/users-controller")(data);

module.exports = function(app) {
    let router = new Router();
    router.get("/adverts", advertsController.getAllAdvertsJSON)
        .get("/users", usersController.getAllUsersJSON)
        .get("/adverts/:id", advertsController.getByIdJSON)
        .get("/users/:id", usersController.getUsersByIdJSON);



    app.use("/api", router);

    return router;
}