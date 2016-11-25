const mongoose = require('mongoose');

module.exports = function(config, models) {
    mongoose.Promise = global.Promise;

    mongoose.connect(config.connectionString, (err) => {
        if (err) {
            console.log(err.message);
        }
    });

    const messageData = require('./messages-data')(models.Message);
    const userData = require('./users-data')(models.User);
    const advertData = require('./adverts-data')(models.Advert);
    const vehicleData = require('./vehicles-data')(models.Vehicle);

    return {
        messageData,
        userData,
        advertData,
        vehicleData
    };
};