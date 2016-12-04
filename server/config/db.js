const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = config => {
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

    return db;
}