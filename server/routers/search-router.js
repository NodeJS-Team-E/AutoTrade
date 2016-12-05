'use strict';
const express = require("express");
let Router = express.Router;

module.exports = function({ app, controller }) {
    let router = new Router();
    router
        .get("/basic", controller.getBasicSearch)
        .post("/basic", controller.basicSearchResults)
        .get("/basic-year", controller.getSearchByYear)
        .post("/basic-year", controller.basicSearchResultsYear)
        .get("/basic-price", controller.getSearchByPrice)
        .post("/basic-price", controller.basicSearchResultsPrice)
        .get("/basic-mileage", controller.getSearchMileage)
        .post("/basic-mileage", controller.basicSearchResultsMileage)
        .get("/", (req, res) => {
            let username = req.query.username;
            let urlToRedirect = `/users/${username}`;
            res.redirect(urlToRedirect);
        });

    app.use("/search", router);

    return router;
}