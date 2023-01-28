const ProductModel = require("../models/productModel");

//get products
const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

//add products
const addProductController = async (req, res) => {
  try {
    const newProducts = new ProductModel(req.body);
    await newProducts.save();
    res.status(201).send(newProducts);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//update product
const editProductController = async (req, res) => {
  try {
    await ProductModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("Item Updated Successfully");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await ProductModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("Item Deleted Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  addProductController,
  getProductController,
  editProductController,
  deleteProductController,
};
