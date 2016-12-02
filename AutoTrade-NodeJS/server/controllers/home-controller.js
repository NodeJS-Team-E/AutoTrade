'use strict';
module.exports = {
    getHome: (req, res) => {
        res.render("home", {
            user: req.user
        });

    },
    getAdvancedSearch: (req, res) => {
        res.render("search-panel");
    }
}