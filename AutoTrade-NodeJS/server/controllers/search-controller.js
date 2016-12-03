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
        //let foundAdvertsByLocationIds = [];
        //let foundVehicleIdsByLocations = [];
        //let filteredVehiclesId = [];
        let foundVehiclesIdsBySearch = [];

        let vehicles = data.vehicleData.getFilteredVehicles(query)
            .then(vehicles => {
                // console.log(vehicles);
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                console.log(foundVehiclesIdsBySearch);
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                data.advertData.findByLocation(adverts);
                console.log(adverts);
            })
    }
    return {
        getBasicSearch,
        getAdvancedSearch,
        basicSearchResults
    }
}