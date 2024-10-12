const express = require("express");
const { adminauth } = require("./Middlewares/auth");
const app = express();
console.log(app.use);

app.listen(3000, () => {
  console.log("Server is started and listening on 3000");
});
/*
app.use("/employee", (req, res, next) => {
  if ("b" === "a") {
    console.log("authenticated sucecssfully");
    next();
  } else {
    res.status(403).send("forbidden");
  }
});*/
app.use(
  "/employee/details",
  adminauth,
  [
    (req, res, next) => {
      console.log("executed 1st handler");
      //res.send("response has been sent from first handler function");
      next();
    },
  ],
  (req, res, next) => {
    console.log("executed 2nd handler");
    throw new Error("error occurred");
    //res.send("response has been sent from second handler function");
  }
);

/*
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
*/
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("error occurred- sending from response");
  }
});

/*Take aways:
 *The order in which the routes are registered matters the most
 *If the route is defined using use, the routes defined using get ,post for the same resource willn't come into picture
 *query parameters in req can be accessed by req.query
 *data in dynamic routes can be accessed by req.routes
 *a route can have multiple handler in seqence and all can be executed, from one handler, we can call the next handler by using next()
once a request is responsded, its done. we can't respond again to the request.
 *Request handler can be put inside an array app.use("/route",[RH1,RH2,RH3],RH4,RH5);
 *midddle ware => the piece which needs to be executed fro multiple routes ,(avoids code duplication)
 * adding a / route at the end i.e(aap.use('/',(err,req,tes,next))) will be helpful in handling the errors and returning a meangingful msg to end users
 */
