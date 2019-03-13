// --Dependecies--
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Loads the Recommender model
const Recommender = require("../../models/Recommender");

router.post("/recommender", (req, res) => {
  const newRecommender = new Recommender({
    userId: req.body.userId,
    itemId: req.body.itemId,
    rating: req.body.rating,
    title: req.body.title
  });
  Recommender.findOne({
    userId: newRecommender.userId
  })

    .then(recommender => {
      // Saves
      new Recommender(newRecommender)
        .save()
        .then(recommender => res.json(recommender));
    })
    .catch(err => console.log(err));
});

module.exports = router;
