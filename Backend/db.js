require('dotenv').config();  // Load environment variables from .env file

const mongoose = require('mongoose');

const connectToMongo = async () => {
   console.log(process.env.CONNECTION_STRING)
  try {
    const connectionString = process.env.CONNECTION_STRING;  // Fetch the connection string
    if (!connectionString) {
      throw new Error("MongoDB connection string is not defined in .env.local");
    }

    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

module.exports = connectToMongo;
