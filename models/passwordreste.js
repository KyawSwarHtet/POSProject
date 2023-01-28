const mongoose = require("mongoose");
const { Schema } = mongoose;

const PasswordResetSchema = new Schema({
  userId: {
    type: String,
  },
  resetString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});
const PasswordResetModel = mongoose.model("PasswordReset", PasswordResetSchema);
module.exports = PasswordResetModel;
