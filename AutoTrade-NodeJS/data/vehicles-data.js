/* globals Promise */
'use strict';

module.exports = function(Vehicle) {
    function create(category, manufactureDate, fuelType, shiftGear, mileage, price, color, ...vehiclePicture) {

        const vehicle = new Vehicle({
            category: category,
            manufactureDate: manufactureDate,
            fuelType: fuelType,
            shiftGear: shiftGear,
            mileage: mileage,
            price: price,
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
        findByVehicleType,
        all
    };
};