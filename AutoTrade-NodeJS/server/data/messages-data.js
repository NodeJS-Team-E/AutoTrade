/* globals Promise */
'use strict';

module.exports = function(Message) {
    function create(options) {

        const message = new Message({
            title: options.title,
            content: options.content,
            date: options.date,
            from: options.from,
            to: options.to,
            read: options.read
        });

        return new Promise((resolve, reject) => {
            message.save((err) => {
                if (err) {
                    return reject(err);
                }

                Message.findOne({ _id: message._id },
                    (err, message) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(message);
                    });
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

    function findById(id) {
        return new Promise((resolve, reject) => {
            Message.findOne({ _id: id }, (message, err) => {
                if (err) {
                    reject(err);
                }

                resolve(message);
            });
        })
    }

    return {
        create,
        findById,
        all
    };
};