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
            location = req.body.location,
            manufacturer = req.body.manufacturer,
            price = req.body.price;

        let query = {
            'year': year,
            'location': location,
            'manufacturer': manufacturer,
            'price': price
        };
        let foundVehiclesIdsBySearch = [];
        let foundAdvertsByLocation = [];

        let vehicles = data.vehicleData.getFilteredVehicles(query)
            .then(vehicles => {
                // console.log(vehicles);
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                // console.log(foundVehiclesIdsBySearch);
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                Object.keys(adverts).forEach(function(key) {
                    let currentAdvertLocation = adverts[key]["location"];
                    if (currentAdvertLocation === location) {
                        //    console.log(adverts);
                    }
                });
            }).catch((err) => console.log(err));
    }
    return {
        getBasicSearch,
        getAdvancedSearch,
        basicSearchResults
    }
}