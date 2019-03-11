// Users Authentication Model
// --Dependecies--
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Loads the user model
const Recommender = require("../../models/Recommender");

router.post("/recommender", (req, res) => {
  const newRecommender = new Recommender({
    userId: req.body.userId,
    itemId: req.body.itemId,
    rating: req.body.rating,
    title: req.body.title
  });
  res.send(req.body);
  console.log(body);
});

module.exports = router;
