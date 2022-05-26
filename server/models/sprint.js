const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sprintSchema = new Schema({
   sprintID: {
    type: String,
  },
  sprintName: {
    type: String,
  },
  sprintMaster: {
    type: String,
  },
});

module.exports = mongoose.model("Sprints", sprintSchema);
