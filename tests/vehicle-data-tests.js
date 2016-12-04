const chai = require("chai");
const sinon = require("sinon");
let expect = chai.expect;

describe("Test vehicle data", () => {

    let Vehicle = {
        find: () => {},
        findOne: () => {}
    };
    let data = require("../server/data/vehicles-data")({ Vehicle });

    describe("Test all()", () => {
        //let Vehicle = { find: function() {} };
        //console.log(Vehicle);
        //let data = require("../server/data/vehicles-data")({ Vehicle });

        it("Expect to return 2 vehicles", done => {
            //arrange
            let vehicles = ["Audi", "Renault"];
            sinon.stub(Vehicle, "find", cb => {
                console.log("----------------------------------------------------in the stub");
                cb(null, vehicles);
            });
            //console.log(data);
            //act
            data.all()
                .then(resultVehicles => {
                    //assert
                    expect(resultVehicles).to.eql(vehicles);
                    done();
                });
            // .catch(err => {
            //     //console.log(err);
            //     done();
            // });
        });
    });
    describe("Test findById()", () => {
        //let Vehicle = { findOne: function() {} };
        //console.log(Vehicle);
        it("Expect to return the vehicle", done => {
            let vehicle = {
                _id: 1,
                name: "Audi"
            };
            let vehicles = [vehicle];
            sinon.stub(Vehicle, "findOne", (query, cb) => {
                let id = query._id;
                let foundVehicle = vehicles.find(v => v._id === id);
                console.log("hereeeeeeee");
                cb(null, foundVehicle);
            });
            data.findById(1)
                .then((actualVehicle) => {
                    expect(actualVehicle).to.eql(vehicle);
                    done();
                });
        });
    });
});