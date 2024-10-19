const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:i2SNpY5nLxOPXV6K@namastenode.xh9ai.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
