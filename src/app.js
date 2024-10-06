const express = require("express");
const app = express();
console.log(app.use);

app.listen(3000, () => {
  console.log("Server is started and listening on 3000");
});
//req with query params
app.get("/user", (req, res) => {
  const ID = req.query.id;
  const NAME = req.query.name;
  res.send(`Deatils of Id: ${ID},Name: ${NAME}`);
});
//dynamic routes
app.get("/products/:id", (req, res) => {
  const PRODUCTNAME = req.params.id;
  res.send(`Deatils product Name: ${PRODUCTNAME}`);
});

app.get("/user", (req, res) => {
  res.send({ firstname: "vaishnavi", lastname: "Chandrasekaran" });
});
app.post("/user", (req, res) => {
  res.send("User information has been added successfully");
});
app.put("/user", (req, res) => {
  res.send("User data has been updated succesfully");
});
app.patch("/user", (req, res) => {
  res.send("user's contact number has been updated successfully");
});
app.delete("/user", (req, res) => {
  res.send("user has been removed form the application");
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

/*Take aways:
 *The order in which the routes are registered matters the most
 *If the route is defined using use, the routes defined using get ,post for the same resource willn't come into picture
 */
