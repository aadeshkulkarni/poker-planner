const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storiesSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  acceptanceCriteria:{
     type:String
  },
  storyPoints:{
     type : Number
  },
  sprintID:{
    type:String
  }
});

module.exports = mongoose.model("Stories", storiesSchema);
