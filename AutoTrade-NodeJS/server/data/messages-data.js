/* globals Promise */
'use strict';

module.exports = function(Message) {
    function create(options) {

        const message = new Message({
            title: options.title,
            content: options.content,
            date: options.date,
            salt: options.salt,
            from: options.from,
            to: options.to,
            read: options.read
        });

        return new Promise((resolve, reject) => {
            message.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(message);
            });
        });
    }

    function all() {
        return new Promise((resolve, reject) => {
            Message.find((err, messages) => {
                if (err) {
                    return reject(err);
                }

                return resolve(messages);
            });
        });
    }

    return {
        create,
        all
    };
};