/* globals Promise */
'use strict';

module.exports = function(Vehicle) {
    function create(vehicleType, manufactureDate, engineType, shiftGear, mileage, price, location, category, color, ...vehiclePicture) {

        const vehicle = new Vehicle({
            vehicleType: vehicleType,
            manufactureDate: manufactureDate,
            engineType: engineType,
            shiftGear: shiftGear,
            mileage: mileage,
            price: price,
            location: location,
            category: category,
            color: color,
            vehiclePicture: vehiclePicture
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

    function findByLocation(location) {
        return new Promise((resolve, reject) => {
            Vehicle.find({ location }, (err, vehicle) => {
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

    return {
        create,
        findByCategory,
        findByLocation,
        findByVehicleType,
        all
    };
};