// Users Authentication Model
// --Dependecies--
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Child Process for connection to recommender
const { exec } = require("child_process");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Loads the user model
const User = require("../../models/User");
const Counter = require("../../models/Counter");

// res.json serves a JSON request
// Route GET api/users/test, this tests the users route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// res.json serves a JSON request
// Route GET api/users/register, registering a user
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // checks validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    //   If users email exists, status code of 400
    if (user) {
      errors.email = "Email already Exists!";
      return res.status(400).json(errors);
    } else {
      // takes in the email
      const avatar = gravatar.url(req.body.email, {
        s: "200", //sizing
        r: "pg", //Rating of image
        d: "mm" //default image if none found
      });
      const newUser = new User({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //   Encrpyts the password and sends back a JSON hashed password if successful
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// res.json serves a JSON request
// Route GET api/users/login, login a user, returning as a token
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // FINDS the user by there email_Id
  User.findOne({ email }).then(user => {
    // if there is no user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Checks the hashed password
    bcrypt.compare(password, user.password).then(isMatch => {
      // checks it the password matchs if it does go into if statement
      if (isMatch) {
        //   User has matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //creates 'PayLoad' passes into token
        // Sends back a JSONWeb Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// res.json serves a JSON request
// Route  api/users/current, this tests the users route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
