const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/userRoute");
const app = express();
const seeder = require("./models/country_state_city");

require("dotenv").config();
app.use(express.static(path.join(__dirname, "./build")));
// Set up MongoDB connection

mongoose
  .connect("mongodb://0.0.0.0:27017/Registration-form", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (connection) => {
    let res = await connection.connections[0].db.listCollections().toArray();
    console.log("Connected to MongoDB", res);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// JSON body parser middleware
app.use(express.json());

app.use("/api", userRoute);

//seed DB
const seedDB = async () => {
  await seeder.Country.deleteMany({});
  await seeder.State.deleteMany({});
  await seeder.City.deleteMany({});
  await seeder.saveCountries();
  await seeder.saveStates();
  await seeder.saveCities();
};

seedDB().then(()=>{
  console.log("data seeded");
})

const PORT = process.env.PORT||3000;
// Start the server
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
