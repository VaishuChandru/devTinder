const adminauth = (req, res, next) => {
  const token = "abc";
  if (token === "abc") {
    console.log("authenticated sucecssfully");
    next();
  } else {
    res.status(403).send("forbidden");
  }
};

module.exports = { adminauth };
