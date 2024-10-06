const express = require("express");
const app = express();
console.log(app.use);

app.listen(3000, () => {
  console.log("Server is started and listening on 3000");
});
app.use("/test", (req, res) => {
  res.send("Hello from express server(test route)- test nodemon");
});
app.use("/hello", (req, res) => {
  res.send("Hello from express server(hello route)- test nodemon");
});
app.use("/", (req, res) => {
  res.send("hello from express erver(root path)-test nodemon");
});
