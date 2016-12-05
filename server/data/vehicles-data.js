/* globals Promise */
'use strict';

module.exports = function(Vehicle) {
    function create(car) {

        const vehicle = new Vehicle({
            price: car.price,
            category: car.category,
            manufacturer: car.manufacturer,
            fuelType: car.fuelType,
            transmission: car.transmission,
            manufactureDate: car.manufactureDate,
            color: car.color,
            mileage: car.mileage,
            vehiclePicture: car.vehiclePicture
        });

        return new Promise((resolve, reject) => {
            vehicle.save((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve(vehicle);
            });
        });
    }

    function findByCategory(category) {
        return new Promise((resolve, reject) => {
            Vehicle.find({ category }, (err, vehicle) => {
                if (err) {
                    return reject(err);
                }

                return resolve(vehicle);
            });
        });
    }

    function findByVehicleType(vehicleType) {
        return new Promise((resolve, reject) => {
            Vehicle.find({ vehicleType }, (err, vehicle) => {
                if (err) {
                    return reject(err);
                }

                return resolve(vehicle);
            });
        });
    }

    function findById(id) {
        return new Promise((resolve, reject) => {
            Vehicle.findOne({ _id: id }, (err, vehicle) => {
                if (err) {
                    return reject(err);
                }
                return resolve(vehicle);
            });
        });

    }

    function all() {
        return new Promise((resolve, reject) => {
            Vehicle.find((err, vehicles) => {
                if (err) {
                    return reject(err);
                }

                return resolve(vehicles);
            });
        });
    }

    function getFilteredVehicles(options) {
        let promise = new Promise((resolve, reject) => {
            let manufacturer = options.manufacturer,
                color = options.color,
                transmission = options.transmission,
                fuelType = options.fuelType,
                category = options.category,
                andCriteria = [{}],
                filter = {};

            if (manufacturer) {
                andCriteria.push({
                    'manufacturer': manufacturer
                });
            }

            if (color) {
                andCriteria.push({
                    'color': color
                });
            }

            if (transmission) {
                andCriteria.push({
                    'transmission': transmission
                });
            }

            if (fuelType) {
                andCriteria.push({
                    'fuelType': fuelType
                });
            }

            if (category) {
                andCriteria.push({
                    'category': category
                });
            }

            filter.$and = andCriteria;

            Vehicle.find(filter)
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
        });

        return promise;
    }

    function getFilteredVehiclesPrice(options) {
        let promise = new Promise((resolve, reject) => {
            let fromPrice = options.fromPrice,
                toPrice = options.toPrice,
                betweenValuesCriteria = {},
                filter = {};

            if (fromPrice) {
                betweenValuesCriteria["$gt"] = +fromPrice;
            } else {
                betweenValuesCriteria["$gt"] = +0;
            }

            if (toPrice) {
                betweenValuesCriteria["$lt"] = +toPrice;
            } else {
                betweenValuesCriteria["$lt"] = +10000000;
            }
            filter.price = betweenValuesCriteria;

            Vehicle.find(filter)
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
        });

        return promise;
    }

    function getFilteredVehiclesYear(options) {
        let promise = new Promise((resolve, reject) => {
            let manufactureDateFrom = options.manufactureDateFrom,
                manufactureDateTo = options.manufactureDateTo,
                betweenValuesCriteria = {},
                filter = {};

            if (manufactureDateFrom) {
                betweenValuesCriteria["$gt"] = +manufactureDateFrom;
            } else {
                betweenValuesCriteria["$gt"] = +0;
            }

            if (manufactureDateTo) {
                betweenValuesCriteria["$lt"] = +manufactureDateTo;
            } else {
                betweenValuesCriteria["$lt"] = +10000000;
            }

            filter.manufactureDate = betweenValuesCriteria;

            Vehicle.find(filter)
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
        });

        return promise;
    }

    function getFilteredVehiclesMileage(options) {
        let promise = new Promise((resolve, reject) => {
            let mileageFrom = options.mileageFrom,
                mileageTo = options.mileageTo,
                betweenValuesCriteria = {},
                filter = {};

            if (mileageFrom) {
                betweenValuesCriteria["$gt"] = +mileageFrom;
            } else {
                betweenValuesCriteria["$gt"] = +0;
            }

            if (mileageTo) {
                betweenValuesCriteria["$lt"] = +mileageTo;
            } else {
                betweenValuesCriteria["$lt"] = +10000000;
            }

            filter.mileage = betweenValuesCriteria;

            Vehicle.find(filter)
                .exec((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
        });

        return promise;
    }

    return {
        create,
        findByCategory,
        findByVehicleType,
        all,
        findById,
        getFilteredVehicles,
        getFilteredVehiclesPrice,
        getFilteredVehiclesYear,
        getFilteredVehiclesMileage
    };
};