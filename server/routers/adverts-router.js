'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router
        .get("/adverts", controller.getAllAdverts)
        .get("/adverts/:id", controller.getAdvertById)
        .post("/adverts/:id", controller.addComment)
        .get("/create-advert", controller.getAdvertCreateForm)
        .post("/create-advert", controller.create)
        .get("/home", controller.listNewest)

    app.use(router);

    return router;
}