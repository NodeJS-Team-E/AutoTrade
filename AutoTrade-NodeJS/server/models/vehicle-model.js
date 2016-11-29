/* globals require module String Number Date */
'use strict'

const mongoose = require('mongoose');

const requiredMessage = '{PATH} is required';

let vehicleSchema = mongoose.Schema({
    price: {
        type: Number,
        required: requiredMessage
    },
    category: {
        type: mongoose.Schema.Types.Mixed,
        required: requiredMessage
    },
    manufacturer: {
        type: String,
        required: requiredMessage
    },
    fuelType: {
        type: String,
        required: requiredMessage
    },
    transmission: {
        type: String,
        enum: ['automatic', 'manual', "automanual"],
        required: requiredMessage
    },
    manufactureDate: {
        type: Number,
        required: requiredMessage
    },
    color: {
        type: String,
        required: requiredMessage
    },
    mileage: {
        type: Number,
        required: requiredMessage
    },
    vehiclePicture: [{
        type: String,
        default: "https://thenypost.files.wordpress.com/2014/11/borat.jpg?quality=90&strip=all&w=1200"
    }]
});

mongoose.model('Vehicle', vehicleSchema);

module.exports = mongoose.model('Vehicle');