const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecommenderSchema = new Schema(
  {
    // Creating One to Many Relationship - User has many recommendations
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    // Index Value in recommendation engine
    userId: {
      type: Number
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
// // ---Counter Schema in database
var CounterSchema = Schema({
  // Countains 2 values that auto increment the userId field
  _id: { type: String, required: true, default: "itemId" },
  seq: { type: Number, default: 10656 }
});
// Counter Collection
let Counter = mongoose.model("counter", CounterSchema);
// ----Pre Hook Function layout----
RecommenderSchema.pre("save", function(next) {
  // Only increment when the document is new
  var doc = this;
  // Counter Find the Id and increment it by 1
  Counter.findOneAndUpdate(
    { _id: "itemId" },
    { $inc: { seq: 1 } },
    (error, counter) => {
      // If there is errors catch
      if (error) {
        return next(error);
      }
      // if there is no counter value - create a new one with the id of ->
      if (!counter) {
        let initialCounter = new Counter({ _id: "itemId", seq: 10656 });
        // Save counter field
        initialCounter.save((error, counter) => {
          if (error) {
            return next(error);
          }
          // userId
          doc.userId = counter.seq;
          // Set Next of variable userId
          next();
        });
      } else {
        doc.userId = counter.seq;
        next();
      }
    }
  );
});

// model created & Exported
module.exports = Recommender = mongoose.model("recommender", RecommenderSchema);
