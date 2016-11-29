/* globals require module String Number Date */
'use strict'
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const requiredMessage = '{PATH} is required';

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
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        username: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: String
    }]
});

mongoose.model('Advert', advertSchema);

module.exports = mongoose.model('Advert');