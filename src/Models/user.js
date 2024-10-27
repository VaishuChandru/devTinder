const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
      match: [
        /^[a-zA-Z]+$/,
        "Firstname is invalid, name should have only alphabets",
      ],
    },
    lastName: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z]+$/,
        "LastName is invalid, name should have only alphabets",
      ],
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email");
        }
      },
    },
    passWord: {
      type: String,
      trim: true,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password should contain atleast 8 characters (one lowercase, one upppercase and one digit)",
      ],
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Please enter valid Gender");
        }
      },
      //enum: ["male", "female", "other"],
    },
    photoUrl: {
      type: String,
      default: "https://pngtree.com/freepng/default-male-avatar_5939655.html",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL" + value);
        }
      },
    },
    about: {
      type: String,
      trim: true,
      default: "Default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const index = userSchema.index({ emailId: 1 }, { unique: true });
//console.log("index", index);
module.exports = { User };
