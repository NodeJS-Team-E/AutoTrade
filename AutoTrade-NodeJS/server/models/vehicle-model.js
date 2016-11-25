/* globals require module String Number Date */
'use strict'

const mongoose = require('mongoose');

const requiredMessage = '{PATH} is required';

let vehicleSchema = mongoose.Schema({
    vehicleType: {
        type: String,
        enum: ['motorcycle', 'car', 'truck', 'bus'],
        require: requiredMessage
    },
    manufactureDate: {
        type: Date,
        require: requiredMessage
    },
    engineType: {
        type: String,
        require: requiredMessage
    },
    shiftGear: {
        type: String,
        enum: ['automatic', 'manual'],
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
    category: {
        type: String,
        require: requiredMessage
    },
    color: {
        type: String,
        require: requiredMessage
    },
    vehiclePicture: [{
        type: String,
        require: requiredMessage
    }]
});

mongoose.model('Vehicle', vehicleSchema);

module.exports = mongoose.model('Vehicle');