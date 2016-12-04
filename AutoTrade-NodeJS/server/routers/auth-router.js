'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.post("/login", controller.login)
        .post("/register", controller.register)
        .get("/logout", controller.logout);



    app.use(router);

    return router;
}