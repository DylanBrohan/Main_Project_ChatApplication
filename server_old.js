//takes in the dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
// Routing to the files in the API folder
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database Config variable - key.js
const db = require("./config/keys").mongoURI;

// Connects to mongoDB, passes in db variable
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//Passport Config file
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("hello")); //Route takes in 2 parametres and directs to home page

app.get("/test", callName); //Route takes in 2 parametres and directs to home page

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000; //listen to port 5000 localhost

app.listen(port, () => console.log(`server running on port ${port}`)); // listens on the port and consoles the result, passes in the port(5000)

function callName() {
  console.log("callName");
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  //var spawn = require("child_process").spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  //    and arguments for the script

  // var process = spawn("python", ["recommender.py", req.query.activeUser]);
  // console.log(activeUser);

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  // process.stdout.on("data", function(data) {
  //   res.send(data.toString());
  // });
}
