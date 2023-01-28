const mongoose = require("mongoose");
require("colors");

//connectDB Function

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

//export
module.exports = connectDB;
