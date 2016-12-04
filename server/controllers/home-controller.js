'use strict';
module.exports = function() {
    return {
        getHome: (req, res) => {
            res.render("home/home", {
                user: req.user
            });

        },
        getAdvancedSearch: (req, res) => {
            res.render("noplacetogo/search-panel");
        }
    }
}