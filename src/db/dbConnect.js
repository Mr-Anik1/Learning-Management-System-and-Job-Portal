const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const url = process.env.DB_CONNECTION_URL;

    // DataBase Connection
    await mongoose.connect(url);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error.message);
    throw new Error("DataBase Connection Failed");
  }
};

module.exports = { dbConnect };
