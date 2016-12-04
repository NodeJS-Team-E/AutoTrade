const fs = require("fs"),
    path = require("path");

module.exports = function({ app, data, controller }) {
    fs.readdirSync(__dirname)
        .filter(file => file.includes("-router"))
        .forEach(file => {
            const modulePath = path.join(__dirname, file);
            require(modulePath)({ app, data, controller });
        });
};