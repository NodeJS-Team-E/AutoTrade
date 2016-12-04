"use strict";

const notifier = require("node-notifier");
const timeWait = 3000;

module.exports = (function() {

    function success(msg) {
        notifier.notify({
            title: "Success",
            message: msg,
            sound: false,
            time: timeWait,
            wait: false,
        }, function(error, response) {
            console.log(response);
        });

    }

    function error(msg) {
        notifier.notify({
            title: "Error",
            message: msg,
            sound: false,
            time: timeWait,
            wait: false,
        }, function(error, response) {
            console.log(response);
        });
    }

    return {
        success,
        error
    };
})();