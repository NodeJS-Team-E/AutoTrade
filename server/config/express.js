'use strict';
const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

module.exports = (app, constants) => {
    app.set("view engine", "pug");
    app.set("views", constants.rootPath + "/server/views/");

    //app.use(express.static(constants.rootPath + "/public"));
    app.use("/static", express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());



}