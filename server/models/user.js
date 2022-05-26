const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
   sprintID: {
    type: String,
  },
  userName: {
    type: String,
  },
  isScrumMaster: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Users", userSchema);
