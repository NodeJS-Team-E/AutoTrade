/* globals require module String Date*/
'use strict';

const mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Schema = mongoose.Schema;

const requiredMessage = '{PATH} is required';
const validationMessage = '{VALUE} is not a valid phone number!';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: requiredMessage,
        unique: true,
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        require: requiredMessage
    },
    pictureUrl: {
        type: String,
        require: requiredMessage,
        default: 'http://wallpapercave.com/wp/3CehTud.jpg'
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: validationMessage
        },
        require: requiredMessage
    },
    salt: String,
    password: String,
    hashPass: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    adverts: [{
        type: Schema.Types.ObjectId,
        ref: 'Advert'
    }]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');