'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.get("/login", controller.getLoginForm)
        .get("/register", controller.getRegisterForm)
        .get("/users/:username", controller.getProfile)
        .get("/profile", controller.getProfile)
        .get("/update-profile", controller.getUpdateForm)
        .post("/update-profile", controller.updateProfile)
        .post("/send-message/:username", controller.receiveMessage)
        .get("/messages", controller.getMessages)
        .get("/unauthorized", controller.getUnauthorized);



    app.use(router);

    return router;
}