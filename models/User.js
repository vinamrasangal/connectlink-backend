const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Corrected from 'require' to 'required'
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Example regex for email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: [String], // Array of Strings (assuming array of userIds or usernames)
      default: [],
    },
    followings: {
      type: [String], // Array of Strings (assuming array of userIds or usernames)
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      maxlength: 50,
    },
    city: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
