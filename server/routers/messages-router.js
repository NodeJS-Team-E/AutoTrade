'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router
        .get("/send-message/:username", controller.getMessageCreateForm)
        .post("/send-message/:username", controller.receiveMessage)
        .get("/messages", controller.getMessages);

    app.use(router);

    return router;
}