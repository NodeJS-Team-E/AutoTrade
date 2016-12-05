'use strict'

module.exports = data => {
    function getBasicSearch(req, res) {
        res.render("search/basic-search")
    }

    function getSearchByYear(req, res) {
        res.render("search/search-date")
    }

    function getSearchByPrice(req, res) {
        res.render("search/search-price")
    }

    function getSearchMileage(req, res) {
        res.render("search/search-mileage")
    }

    function basicSearchResults(req, res, next) {
        let manufacturer = req.body.manufacturer,
            color = req.body.color,
            transmission = req.body.transmission,
            fuelType = req.body.fuelType,
            category = req.body.category;

        let query = {
            'manufacturer': manufacturer,
            'color': color,
            'transmission': transmission,
            'fuelType': fuelType,
            'category': category
        };

        let foundVehiclesIdsBySearch = [];

        data.vehicleData.getFilteredVehicles(query)
            .then(vehicles => {
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                res.render("search/search-results", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    function basicSearchResultsYear(req, res, next) {
        let manufactureDateFrom = req.body.manufactureDateFrom,
            manufactureDateTo = req.body.manufactureDateTo;

        let query = {
            'manufactureDateFrom': manufactureDateFrom,
            'manufactureDateTo': manufactureDateTo
        };
        let foundVehiclesIdsBySearch = [];

        data.vehicleData.getFilteredVehiclesYear(query)
            .then(vehicles => {
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                res.render("search/search-results", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    function basicSearchResultsPrice(req, res, next) {
        let fromPrice = req.body.fromPrice,
            toPrice = req.body.toPrice;

        let query = {
            'fromPrice': fromPrice,
            'toPrice': toPrice
        };
        let foundVehiclesIdsBySearch = [];

        data.vehicleData.getFilteredVehiclesPrice(query)
            .then(vehicles => {
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                res.render("search/search-results", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    function basicSearchResultsMileage(req, res, next) {
        let mileageFrom = req.body.mileageFrom,
            mileageTo = req.body.mileageTo;

        let query = {
            'mileageFrom': mileageFrom,
            'mileageTo': mileageTo
        };
        let foundVehiclesIdsBySearch = [];

        data.vehicleData.getFilteredVehiclesMileage(query)
            .then(vehicles => {
                Object.keys(vehicles).forEach(function(key) {
                    let currentVehicleId = vehicles[key]["_id"];
                    foundVehiclesIdsBySearch.push(currentVehicleId);
                });
                return data.advertData.getAdvertByVehicleIds(foundVehiclesIdsBySearch);
            }).then(adverts => {
                res.render("search/search-results", {
                    adverts: adverts,
                    user: req.user
                });
            }).catch((err) => console.log(err));
    }

    return {
        getBasicSearch,
        getSearchByYear,
        getSearchByPrice,
        getSearchMileage,
        basicSearchResults,
        basicSearchResultsYear,
        basicSearchResultsPrice,
        basicSearchResultsMileage
    }
}