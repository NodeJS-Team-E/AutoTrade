'use strict';
const express = require("express"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    constants = require("./constants"),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//require('../passport/')(app);
require("./express")(app, constants);
require("./router")(app);

module.exports = app;