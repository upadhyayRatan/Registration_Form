import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const App = () => {
  const { register, handleSubmit, control, watch } = useForm();
  const navigate = useNavigate();

  const [errors, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dob: "",
  });
  const [age, setAge] = useState("");

  const onSubmit = (data) => {
    console.log("form dta", data);
    axios
      .post("/api/registration", data)
      .then((response) => {
        setError({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          state: "",
          city: "",
          gender: "",
          dob: "",
        });
        console.log(response.data);
        navigate(`/profile/${data.email}`);
      })
      .catch((error) => {
        let errorObj = {
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          state: "",
          city: "",
          gender: "",
          dob: "",
        };
        console.log("error", error);
        let errorMsg = error.response.data.error;
        console.log("err msg", errorMsg);
        for (let err in errorObj) {
          if (errorMsg.includes(err)) {
            errorObj[err] = true;
          }
        }
        setError(errorObj);
      });
  };

  // const countryList = ["Country 1", "Country 2", "Country 3"];
  // const stateList = {
  //   "Country 1": ["State 1", "State 2", "State 3"],
  //   "Country 2": ["State 4", "State 5", "State 6"],
  //   "Country 3": ["State 7", "State 8", "State 9"],
  // };
  // const cityList = {
  //   "State 1": ["City 1", "City 2", "City 3"],
  //   "State 2": ["City 4", "City 5", "City 6"],
  //   "State 3": ["City 7", "City 8", "City 9"],
  // };

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState({});
  const [cityList, setCityList] = useState({});
  useEffect(() => {
    (async function () {
      const response = await axios.get("/api/getCountry");
      const country = response.data.countryList;
      const state = response.data.stateList;
      const cities = response.data.cityList;
      setCountryList(country);
      setStateList(state);
      setCityList(cities);
      console.log("country respo", response);
    })();
  }, []);

  return (
    <div className="row">
      <h1 className="mx-auto text-center text-dark registerHeading col-12">
        Registration Form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-11 col-sm-8 col-md-6 mx-auto register-form"
      >
        <div className="row text-center">
          <div className="form-floating mb-3 col-6 formInput">
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="name@example.com"
              {...register("firstName", {
                // required: true,
                // pattern: /^[A-Za-z]+$/i,
              })}
            />
            <label htmlFor="firstName" className="formLabel">First name</label>
            {errors.firstName && (
              <p className="errMsg">
                First name is required and must contain only alphabets
              </p>
            )}
          </div>
          <div className="form-floating mb-3 col-6 formInput">
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="lastName@example.com"
              {...register("lastName", {
                // required: true,
                // pattern: /^[A-Za-z]+$/i,
              })}
            />
            <label htmlFor="lastName" className="formLabel">Last Name</label>
            {errors.lastName && (
              <p className="errMsg">
                Last name is required and must contain only alphabets
              </p>
            )}
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="email@example.com"
            {...register("email", {
              // required: true,
              // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          <label htmlFor="email" className="formLabel">E-Mail</label>
          {errors.email && <p className="errMsg">Invalid email format</p>}
        </div>
        <div className="form-floating mb-3">
          <select
            id="country"
            className="form-control"
            placeholder="country@example.com"
            {...register("country")}
          >
            <option value="">-- Select a country --</option>
            {countryList &&
              countryList.map((country, index) => (
                <option value={country} key={index}>
                  {country}
                </option>
              ))}
          </select>
          {/* <label htmlFor="country">Country</label> */}
          {errors.country && <p className="errMsg">Country is required</p>}
        </div>
        <div className="form-floating mb-3">
          <select id="state" className="form-control" {...register("state")}>
            <option value="">-- Select a state --</option>
            {stateList &&
              watch("country") &&
              stateList[watch("country")].map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
          </select>
          {errors.state && <p className="errMsg">State is required</p>}
        </div>
        <div className="form-floating mb-3">
          <select id="city" className="form-control" {...register("city")}>
            <option value="">-- Select a city --</option>
            {cityList &&
              watch("state") &&
              cityList[watch("state")].map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
          </select>

          {errors.city && <p className="errMsg">City is required</p>}
        </div>
        <div className="form-floating mb-3">
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="form-control form-check-input"
                {...register("gender")}
              />
              Male
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="form-control form-check-input"
                {...register("gender")}
              />
              Female
            </label>
          </div>
          {errors.gender && <p className="errMsg">Gender is required</p>}
        </div>
        <div className="row">
          <div className="form-floating col-6 mb-3">
            <div className=" form-control">
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <DatePicker
                    onChange={(date) => {
                      field.onChange(date);
                      setAge(getAge(date));
                    }}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    placeholderText="Select date"
                    className="datePicker"
                  />
                )}
              />
              {errors.dob && (
                <p className="errMsg">
                  Date of birth is required and must be older than 14 years
                </p>
              )}
            </div>
          </div>
          <div className="form-floating mb-3 col-6">
            <input
              className="form-control"
              type="text"
              id="age"
              placeholder="age@example.com"
              value={age}
              readOnly
            />
            <label htmlFor="age" className="formLabel">Age</label>
          </div>
        </div>

        <button type="submit" className="buttons">
          Save
        </button>
      </form>
    </div>
  );
};

export default App;
