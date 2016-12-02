'use strict';
module.exports = {
    getHome: (req, res) => {
        res.render("home/home", {
            user: req.user
        });

    },
    getAdvancedSearch: (req, res) => {
        res.render("noplacetogo/search-panel");
    }
}