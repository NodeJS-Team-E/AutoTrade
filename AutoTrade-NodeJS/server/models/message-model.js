/* globals require module String  Date*/
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const requiredMessage = '{PATH} is required';


const messagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: requiredMessage
    },
    content: {
        type: String,
        required: requiredMessage
    },
    date: Date,
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    read: Boolean
});

mongoose.model('Message', messagesSchema);

module.exports = mongoose.model('Message');