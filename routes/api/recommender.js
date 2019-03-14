// --Dependecies--
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");

// Loads the Recommender model
const Recommender = require("../../models/Recommender");
const User = require("../../models/User");

router.post("/recommender", (req, res) => {
  const newRecommender = new Recommender({
    // user: user._id,
    userId: req.body.userId,
    itemId: req.body.itemId,
    rating: req.body.rating,
    title: req.body.title
  });
  Recommender.findOne({
    // user: req.user.id
    user: newRecommender.userId
  })
    .populate("user")
    .then(recommender => {
      console.log(req.user);
      // Saves
      new Recommender(newRecommender)
        .save()
        .then(recommender => res.json(recommender));
    })
    .catch(err => console.log(err));
});

module.exports = router;
