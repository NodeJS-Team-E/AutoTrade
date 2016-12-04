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
            let manufactureDate = options.manufactureDate,
                manufacturer = options.manufacturer,
                price = options.price,
                //
                category = options.category,
                fuelType = options.fuelType,
                transmission = options.transmission,
                color = options.color,
                mileage = options.mileage,
                andCriteria = [{}],
                filter = {};

             if (category) {
                andCriteria.push({
                    'category': category
                });
            }
             if (fuelType) {
                andCriteria.push({
                    'fuelType': fuelType
                });
            }
            if (transmission) {
                andCriteria.push({
                    'transmission': transmission
                });
            }
            if (color) {
                andCriteria.push({
                    'color': color
                });
            }
             if (mileage) {
                andCriteria.push({
                    'mileage': mileage
                });
            }
            if (price) {
                andCriteria.push({
                    'price': price
                });
            }
            if (manufactureDate) {
                andCriteria.push({
                    'manufactureDate': manufactureDate
                });
            }
            if (manufacturer) {
                andCriteria.push({
                    'manufacturer': manufacturer
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

    return {
        create,
        findByCategory,
        findByVehicleType,
        all,
        findById,
        getFilteredVehicles
    };
};