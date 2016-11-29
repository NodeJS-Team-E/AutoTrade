module.exports = function() {
    const Message = require('./message-model');
    const User = require('./user-model');
    const Advert = require('./advert-model');
    const Vehicle = require('./vehicle-model');

    return {
        User,
        Message,
        Advert,
        Vehicle
    };
};