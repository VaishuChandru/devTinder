const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignUp } = require("../utils/validation");
const { User } = require("../Models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, emailId, passWord } = req.body;
    const passwordHash = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passwordHash,
    });
    await user.save();
    res.send("User has been added successfully");
  } catch (err) {
    res.status(400).send(`Error occurred: ${err} `);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, passWord } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentails");
    } else {
      const isValidPassWord = await user.validatePassword(passWord);
      if (isValidPassWord) {
        res.cookie("token", await user.getJWT(), {
          expires: new Date(Date.now() + 1 * 3600000),
        });
        res.send("Logged in successfully");
      } else {
        throw new Error("Invalid Credentails");
      }
    }
  } catch (err) {
    res.status(400).send("Error occurred:" + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: `You are logged out successfully`,
  });
});

module.exports = { authRouter };
