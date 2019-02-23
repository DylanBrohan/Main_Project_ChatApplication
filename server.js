// //takes in the dependencies
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const passport = require("passport");

// // Routing to the files in the API folder
// const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
// const posts = require("./routes/api/posts");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// //Database Config variable - key.js
// const db = require("./config/keys").mongoURI;

// // Connects to mongoDB, passes in db variable
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // passport middleware
// app.use(passport.initialize());

// //Passport Config file
// require("./config/passport")(passport);

// // User Routes
// app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

// const port = process.env.PORT || 5000; //listen to port 5000 localhost

// app.listen(port, () => console.log(`server running on port ${port}`)); // listens on the port and consoles the result, passes in the port(5000)

// app.get("/rec", (req, res) => {
//   let spawn = require("child_process").spawn;
//   let process = spawn("python", ["recommender.py"]);
//   process.stdout.on("data", function(data) {
//     res.send(data.toString());
//   });
// });

// app.get("/rec2/:id", (req, res) => {
//   let spawn = require("child_process").spawn;
//   let process = spawn("python", ["recommender.py"]);
//   process.stdout.on("data", function(data) {
//     res.send(data.toString());
//   });
// });

// app.listen(port, () => console.log(`server running on port ${port}`));

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
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//Passport Config file
require("./config/passport")(passport);

// app.get("/", (req, res) => res.send("hello")); //Route takes in 2 parametres and directs to home page

// app.get("/test"); //Route takes in 2 parametres and directs to home page

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000; //listen to port 5000 localhost

app.listen(port, () => console.log(`server running on port ${port}`)); // listens on the port and consoles the result, passes in the port(5000)

app.get("/rec", (req, res) => {
  let spawn = require("child_process").spawn;
  let process = spawn("python", ["recommender.py"]);
  process.stdout.on("data", function(data) {
    res.send(data.toString());
  });
});

app.get("/rec2/:id", (req, res) => {
  let spawn = require("child_process").spawn;
  let process = spawn("python", ["recommender.py"]);
  process.stdout.on("data", function(data) {
    res.send(data.toString());
  });
});
