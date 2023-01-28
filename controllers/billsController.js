const BillsModel = require("../models/billsModel");

//add items
const addbillsController = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newBill = new BillsModel(req.body);
    await newBill.save();
    res.status(201).send("new Bill added Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//get bills data
const getbillsController = async (req, res) => {
  try {
    const bills = await BillsModel.find();
    res.status(200).send(bills);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = {
  addbillsController,
  getbillsController,
};
