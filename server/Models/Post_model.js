const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  categories: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    require: true,
  },
});

const post = mongoose.model("postModel",postModel);

module.exports = {post}
