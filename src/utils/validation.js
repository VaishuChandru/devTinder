const validator = require("validator");

const validateSignUp = (req) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const passWord = req.body.passWord;
  if (!firstName || !lastName) {
    throw new Error("Please fill first and last name");
  }
  if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First name should have more than 3 characters");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email id");
  }
  if (!validator.isStrongPassword(passWord)) {
    throw new Error("Set a strong password");
  }
};

module.exports = { validateSignUp };
