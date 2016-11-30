const mongoose = require('mongoose');


module.exports = function(config, models) {
    mongoose.Promise = global.Promise;

    mongoose.connect(config.connectionString, (err) => {
        if (err) {
            console.log(err.message);
        }
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log('Connection failed\n!' + err);
    })

    db.on('open', () => {
        console.log('Connection succsess!');
    })

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