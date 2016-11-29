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