const mongoose = require("mongoose");
const { Schema } = mongoose;

//for create table into db
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    //for date
    timestap: true,
  }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
