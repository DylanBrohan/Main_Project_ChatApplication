const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// autoIncrement.initialize(connection);

const RecommenderSchema = new Schema(
  {
    //   All numbers to fit the recommendation engine Matrix layout
    // Defining my fields
    userId: {
      type: Number,
      required: true
    },
    itemId: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Number,
      required: false
    },
    title: {
      type: String,
      required: true
    }
    //   Scoping on one Collection only
  },
  { collection: "recommender" }
);
// model created & Exported
module.exports = Recommender = mongoose.model("recommender", RecommenderSchema);
