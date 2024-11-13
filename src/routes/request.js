const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("sending connection Request");
  res.send(req.user.firstName + " sent connection Request");
});

module.exports = { requestRouter };
