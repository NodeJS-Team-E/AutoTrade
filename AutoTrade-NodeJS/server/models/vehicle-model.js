/* globals require module String Number Date */
'use strict'

const mongoose = require('mongoose');

const requiredMessage = '{PATH} is required';

let vehicleSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.Mixed,
        required: requiredMessage
    },
    manufactureDate: {
        type: Number,
        require: requiredMessage
    },
    fuelType: {
        type: String,
        require: requiredMessage
    },
    shiftGear: {
        type: String,
        enum: ['automatic', 'manual', "automanual"],
        require: requiredMessage
    },
    mileage: {
        type: Number,
        require: requiredMessage
    },
    price: {
        type: Number,
        require: requiredMessage
    },
    color: {
        type: String,
        require: requiredMessage
    },
    vehiclePicture: [{
        type: String,
        default: "https://thenypost.files.wordpress.com/2014/11/borat.jpg?quality=90&strip=all&w=1200"
    }]
});

mongoose.model('Vehicle', vehicleSchema);

module.exports = mongoose.model('Vehicle');