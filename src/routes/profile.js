const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`Error occurred: ${err}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (validateEditProfileData(req)) {
      console.log("logging from profile edit api");
      const loggedInUser = req.user;
      Object.keys(req.body).forEach(
        (field) => (loggedInUser[field] = req.body[field])
      );
      await loggedInUser.save();
      res.json({
        message: ` hey ${loggedInUser.firstName}, your profile has been updated succesfully`,
      });
    } else {
      res.status(400).send("password can't be edited");
    }
  } catch (err) {
    res.status(400).send(`Error occurred: ${err}`);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    console.log("logging from password change api");
    const user = req.user;
    const isPasswordCorrect = await user.validatePassword(req.body.oldPassWord);
    /*= await bcrypt.compare(
      req.body.oldPassWord,
      user.passWord
    );*/
    if (isPasswordCorrect) {
      if (validator.isStrongPassword(req.body.passWord)) {
        const hashedPassWord = await bcrypt.hash(req.body.passWord, 10);
        user.passWord = hashedPassWord;
        user.save();
        res.json({
          message: `hey ${req.user?.firstName}, your password has been updated succesfully`,
        });
      } else {
        res.status(400).json({
          message: `hey ${req.user?.firstName}, your password is not strong enough, make it harder please`,
        });
      }
    } else {
      res.status(400).send(`Please enter correct old password`);
    }
  } catch (err) {
    res.status(400).send(`Error occurred:${err}`);
  }
});

module.exports = { profileRouter };
