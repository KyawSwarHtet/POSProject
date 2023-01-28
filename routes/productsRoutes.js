const express = require("express");
const {
  getProductController,
  addProductController,
  editProductController,
  deleteProductController,
} = require("../controllers/productController");

const router = express.Router();

//routes
// Method - get
router.get("/getproducts", getProductController);
//Method -post
router.post("/addproducts", addProductController);
//Method -put
router.put("/editproducts", editProductController);
//Method -Delete
router.delete("/deleteproducts", deleteProductController);

module.exports = router;
