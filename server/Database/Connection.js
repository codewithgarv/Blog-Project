require('dotenv').config();
const mongoose = require("mongoose");

const Connection = async () => {
 
  try {
    await mongoose.connect(process.env.db_url);
    console.log("DB connected successfully...");
  } catch (error) {
    console.log("Database connection failed...");
  }
};
module.exports = Connection;
