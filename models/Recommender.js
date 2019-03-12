const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// autoIncrement.initialize(connection);

const RecommenderSchema = new Schema(
  {
    //   All numbers to fit the recommendation engine Matrix layout
    // Defining my fields
    userId: {
      type: Number,
      // inc_field: true,
      // disable_hooks: true
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

// RecommenderSchema.plugin(AutoIncrement, {
//   inc_field: "userId",
//   disable_hooks: true
// });

// model created & Exported
module.exports = Recommender = mongoose.model("recommender", RecommenderSchema);
