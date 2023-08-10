const mongoose = require("mongoose");
const getAge= require('../utils/getAge')
// Create a Mongoose schema for the registration form
const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate(firstName) {
      if (!firstName.match(/^[A-Za-z]+$/i)) {
        throw new Error(
          "First name is required and must contain only alphabets"
        );
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    validate(lastName) {
      if (!lastName.match(/^[A-Za-z]+$/i)) {
        throw new Error(
          "last name is required and must contain only alphabets"
        );
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate(email) {
      if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        throw new Error("Invalid e-mail");
      }
    },
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  dob: {
    type: Date,
    required: true,
    validate(dob) {
      let age=getAge(dob)
      if (age < 15) throw new Error("Must be older than 14 yrs");
    }  
  },
});

// Create a model based on the schema
const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
