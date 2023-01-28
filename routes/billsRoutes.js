const express = require("express");
const {
  addbillsController,
  getbillsController,
} = require("../controllers/billsController");

const router = express.Router();

//routes
//Method -get
router.get("/getbills", getbillsController);
//Method -post
router.post("/addbills", addbillsController);

module.exports = router;
