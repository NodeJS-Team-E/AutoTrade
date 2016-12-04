module.exports = function(config, models) {
    const messageData = require('./messages-data')(models.Message),
        userData = require('./users-data')(models.User),
        advertData = require('./adverts-data')(models.Advert),
        vehicleData = require('./vehicles-data')(models.Vehicle);

    return {
        messageData,
        userData,
        advertData,
        vehicleData
    };
};