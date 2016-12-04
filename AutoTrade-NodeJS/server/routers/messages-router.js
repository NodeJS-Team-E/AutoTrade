'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router.get("/send-message/:username", controller.getCreateForm);



    app.use(router);

    return router;
}