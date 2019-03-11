const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// autoIncrement.initialize(connection);

const RecommenderSchema = new Schema({
  // Defining my fields
  userId: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  }
});
// model created & Exported
module.exports = Recommender = mongoose.model("recommender", RecommenderSchema);
