'use strict';
module.exports = data => {
    function getMessageCreateForm(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        res.render("messages/send-message", { user: req.user });
    }

    function receiveMessage(req, res) {
        let options = {
            title: req.body.title,
            content: req.body.content,
            from: req.user.username,
            to: req.params.username
        }
        data.messageData.create(options)
            .then(message => {
                data.userData.addMessage(req.params.username, message);
                res.redirect("/users/" + req.params.username);
            })
    }

    function getMessages(req, res) {
        if (!req.isAuthenticated()) {
            res.status(401).render("noplacetogo/unauthorized");
        }
        let messages = req.user.messages;
        res.render("messages/messages-list", {
            messages: messages,
            user: req.user
        })
    }

    return {
        getMessageCreateForm,
        receiveMessage,
        getMessages
    }
}