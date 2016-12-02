/* globals require module String  Date*/
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const requiredMessage = '{PATH} is required';
const dateFormat = require("dateformat");


const messagesSchema = new mongoose.Schema({
    title: {
        type: Schema.Types.Mixed,
        required: requiredMessage
    },
    content: {
        type: String,
        required: requiredMessage
    },
    date: {
        type: String,
        default: dateFormat("mediumDate")
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: String,
        required: requiredMessage
    },
    read: Boolean
});

mongoose.model('Message', messagesSchema);

module.exports = mongoose.model('Message');