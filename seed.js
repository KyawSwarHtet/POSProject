const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const ProductModel = require("./models/productModel");
const products = require("./utils/data");
require("colors");

//config
dotenv.config();
connectDB();

//function seeder
const importData = async () => {
  try {
    await ProductModel.deleteMany();
    const productsData = await ProductModel.insertMany(products);
    console.log("All products Added".bgGreen);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importData();
