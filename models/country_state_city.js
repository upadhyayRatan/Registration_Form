const countries = require("../data/countries");
const states = require("../data/states");
const cities = require("../data/cities");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "State",
  },
});

const stateSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

const countrySchema = new Schema({
  _id: {
    type: Number,
  },
  sortname: {
    type: String,
  },
  name: {
    type: String,
  },
  states: [
    {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
  ],
});

var Country = mongoose.model("Country", countrySchema);
var State = mongoose.model("State", stateSchema);
var City = mongoose.model("City", citySchema);

const _saveStates=async()=>{
  const countries = await Country.find();
  for(const country of countries){
    for(const state of states){
      if (state.country_id == country._id + "") {
        var st = new State({
          _id: state.id,
          name: state.name,
          country: country,
        });

        await st.save();
        country.states.push(st);
        await country.save();
      }
    }
  }
  console.log("All States Done");
}


const _saveCities=async()=>{
  const states = await State.find();
  for(const state of states){
    for(const city of cities){
      if (city.state_id == state.id + "") {
        var ct = new City({ _id: city.id, name: city.name, state: state });
        await ct.save();
        // state.cities.push(ct);
        // await state.save();
      }
    }
  }
  console.log("All Cities Done");
}


const _saveCountries=async()=>{
  for(const country of countries){
    var cn = new Country({
      _id: country.id,
      sortname: country.sortname,
      name: country.name,
    });

    await cn.save();
  }
  console.log("================= All Countries loaded ===================");
}

module.exports = {
  saveStates: _saveStates,
  saveCities: _saveCities,
  saveCountries: _saveCountries,
  Country: Country,
  State: State,
  City: City,
};
