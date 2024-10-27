const express = require("express");
const { adminauth } = require("./Middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./Models/user");
const app = express();

app.use(express.json());
connectDB()
  .then(() => {
    console.log("connected to db successfully");
    app.listen(3000, () => {
      console.log("server is listeming on 3000");
    });
  })
  .catch((err) => {
    console.error("Sorry, not able to connect to database");
  });

//singup API
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    if (savedUser === user) {
      res.send("User has been added successfully");
    } else {
      res
        .status(500)
        .send(
          "An error occurred, please pass all the required fields like mailid, firstname, password"
        );
    }
  } catch (err) {
    res.send(`Error occurred: ${err} `);
  }
});

//get a user using a mailid
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("No such user is found on the database");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send(`Error occurred: ${err}`);
  }
});

//Feep API - Get all the users from collection
app.get("/feed", async (req, res) => {
  //const data = JSON.stringify(await User.find());
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("No users found");
    }
  } catch (err) {
    res.status(500).send(`Error occurred: ${err}`);
  }
});

//update user details
app.patch("/user/:emailId", async (req, res) => {
  try {
    //users are allowed to update age,about,photo and skills
    const ALLOWED_UPDATES = ["age", "about", "photoUrl", "skills"];
    if (req.body?.skills?.length > 10) {
      throw new Error("Can't add more than 10 skills");
    }
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const updatedUser = await User.findOneAndUpdate(
      { emailId: req.params.emailId },
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedUser) {
      res.send("User info has been updated succesfully");
    } else {
      res.status(500).send("Update failed");
    }
  } catch (err) {
    res.status(500).send(`Error occurred: ${err}`);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const mailId = req.body.emailId;
    const deletedUser = await User.deleteOne({ emailId: mailId });
    if (deletedUser.deletedCount == 0) {
      res.status(404).send("No such user exist");
    } else if (deletedUser.deletedCount == 1) {
      res.send("User has been deleted successfully");
    }
  } catch (err) {
    res.status(500).send(`Error occured ${err}`);
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
 * Improve update api  
 */
