const mongoose = require("mongoose");
require('dotenv').config();


const condb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected successflly");
  } catch (err) {
    console.log(`Error on connecting to MongoDB: ${err}`);
  }
};
module.exports = condb;