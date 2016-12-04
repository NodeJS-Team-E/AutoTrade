'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.get("/", (req, res) => {
        res.redirect("/home");
    });
    router
        .get("/home", controller.getHome)

    app.use(router);

    return router;
}