'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.get("/adverts", controller.getAllAdvertsJSON)
        .get("/users", controller.getAllUsersJSON)
        .get("/adverts/:id", controller.getByIdJSON)
        .get("/users/:id", controller.getUsersByIdJSON);



    app.use("/api", router);

    return router;
}