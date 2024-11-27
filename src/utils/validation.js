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

const validateEditProfileData = (req) => {
  const ALLOWEDEDITFIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isValidEdit = Object.keys(req.body).every((field) =>
    ALLOWEDEDITFIELDS.includes(field)
  );
  if (req.body?.firstName?.length < 3 || req.body?.firstName?.length > 50) {
    throw new Error("First name should have more than 3 characters");
  }
  if (req.body?.skills?.length > 10) {
    throw new Error("Can't add more than 10 skills");
  }
  if (req.body?.about?.length > 100) {
    throw new Error("About can't have more than 100 characters");
  }
  return isValidEdit;
};

module.exports = { validateSignUp, validateEditProfileData };
