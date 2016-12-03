/* globals require module String Number Date */
'use strict'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const requiredMessage = '{PATH} is required';
const dateFormat = require("dateformat");

let advertSchema = mongoose.Schema({
    title: {
        type: String,
        require: requiredMessage
    },
    description: {
        type: String
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle"
    },
    location: {
        type: String,
        required: requiredMessage
    },
    postedOn: {
        type: String,
        default: dateFormat("mediumDate")
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        username: String,
        content: String
    }]
});

mongoose.model('Advert', advertSchema);

module.exports = mongoose.model('Advert');