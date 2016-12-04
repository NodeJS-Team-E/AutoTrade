'use strict'

module.exports = data => {
    function getBasicSearch(req, res) {
        res.render("search/basic-search")
    }

    function getAdvancedSearch(req, res) {
        res.render("search/advanced-search");
    }

    function basicSearchResults(req, res, next) {
        let year = req.body.year,
            manufacturer = req.body.manufacturer,
            price = req.body.price,
            category = req.body.category,
            fuelType = req.body.fuelType,
            transmission = req.body.transmission,
            color = req.body.color,
            mileage=req.body.mileage;

        let query = {
            'year': year,
            'manufacturer': manufacturer,
            'price': price,
            'category': category,
            'fuelType': fuelType,
            'transmission': transmission,
            'color':color,
            'mileage':mileage
        };
        let foundVehiclesIdsBySearch = [];
        let foundAdvertsByLocation = [];

        data.vehicleData.getFilteredVehicles(query)
            .then(vehicles => {
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                console.log(adverts);
                res.render("search/search-results", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }
    return {
        getBasicSearch,
        getAdvancedSearch,
        basicSearchResults
    }
}