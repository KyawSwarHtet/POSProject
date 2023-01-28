const UserModel = require("../models/userModel");

//login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await UserModel.findOne({ userId, password, verified: true });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//register user
const registerController = async (req, res) => {
  try {
    const newUser = new UserModel({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("new User added Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerController,
};
