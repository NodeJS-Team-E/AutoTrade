'use strict';
module.exports = function(data) {
    return {
        getHome: (req, res) => {
            data.advertData.sortByNewlyCreated()
                .then(adverts => {
                    res.render("home/home", {
                        adverts: adverts,
                        user: req.user
                    });
                });
        },
        getAdvancedSearch: (req, res) => {
            res.render("noplacetogo/search-panel");
        }
    }
}