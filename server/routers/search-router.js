'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router
        .get("/basic", controller.getBasicSearch)
        .post("/basic", controller.basicSearchResults)
        .get("/advanced", controller.getAdvancedSearch)



    app.use("/search", router);

    return router;
}