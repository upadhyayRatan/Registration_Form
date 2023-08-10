const express = require("express");
const userRoute = express();
const Registration = require("../models/Registration");
const getAge = require("../utils/getAge");
const { Country, State, City } = require("../models/country_state_city");

// API endpoint to save registration information
userRoute.post("/registration", async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    //calculate month difference from current date in time
    const dob = req.body.dob;
    const age = getAge(dob);
    res
      .status(201)
      .json({ message: "Registration saved successfully", age: age });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API endpoint to get all registrations
userRoute.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find({ email: req.query.email });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRoute.get("/getCountry", async (req, res) => {
  const countryList = [];
  const stateList = {};
  const cityList = {};

  const countries = await Country.find({});
  const states = await State.find({});

  for (let country of countries) {
    countryList.push(country.name);
    let stateNames = [];
    const statesFiltered = await State.aggregate([
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "states",
        },
      },
      { $match: { country: country._id } },
    ]);
    statesFiltered.forEach((state) => stateNames.push(state.name));
    for (let state of states) {
      let cityNames = [];
      const citiesFiltered = await City.aggregate([
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "cities",
          },
        },
        {
          $match: { state: state._id },
        },
      ]);
      citiesFiltered.forEach((city) => cityNames.push(city.name));
      cityList[state.name] = cityNames;
    }
    stateList[country.name] = stateNames;
  }

  //console.log("in country", countryList, stateList, cityList);
  res.status(200).send({ countryList, stateList, cityList });
});

module.exports = userRoute;

