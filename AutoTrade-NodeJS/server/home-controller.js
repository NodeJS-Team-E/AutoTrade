'use strict';
module.exports = {
    getHome: (req, res) => {
        res.render("home");

    },
    getAdvancedSearch: (req, res) => {
        res.render("search-panel");
    }
}