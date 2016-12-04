'use strict';
const express = require("express"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    constants = require("./constants"),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
require('./passport/')(app);
require("./express")(app, constants);
//require("./router")(app);
require("./db")(constants);

module.exports = app;