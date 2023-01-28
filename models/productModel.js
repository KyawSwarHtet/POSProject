const mongoose = require("mongoose");
const { Schema } = mongoose;

//for create table into db
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    //for date
    timestap: true,
  }
);

const ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
