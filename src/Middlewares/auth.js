const jwt = require("jsonwebtoken");
const { User } = require("../Models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invaild Token");
    }
    const decodedObj = jwt.verify(token, "Dev@Tinder@123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
    }
    next();
  } catch (err) {
    res.status(400).send(`Error occurred: ${err}`);
  }
};

module.exports = { userAuth };
