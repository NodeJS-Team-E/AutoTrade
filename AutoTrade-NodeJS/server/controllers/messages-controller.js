'use strict';
module.exports = data => {
    function getCreateForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        res.render("messages/send-message", { user: req.user });
    }

    function getById(req, res) {
        data.messageData.findById(req.params._id)
            .then(message => {
                console.log(message);
            });
    }

    function all(req, res) {
        // data.messageData.all()
        //     .then(messages => {
        //         res.render("messages/messages-list", {
        //             messages: messages,
        //             user: req.user
        //         });
        //     }).catch((err) => console.log(err));
    }

    return {
        getCreateForm,
        getById,
        all
    }
}