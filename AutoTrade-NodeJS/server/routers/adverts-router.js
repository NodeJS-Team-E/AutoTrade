'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.get("/adverts", controller.getAll)
        .get("/adverts/:id", controller.getById)
        .get("/create-advert", controller.getCreateForm)
        .post("/create-advert", controller.create);



    app.use(router);

    return router;
}