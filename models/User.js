const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema(
  {
    // Defining my fields
    userId: {
      type: Number
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
  // { userId: false }
);

// ---Counter Schema in database
var CounterSchema = Schema({
  // Countains 2 values that auto increment the userId field
  _id: { type: String, required: true, default: "itemId" },
  seq: { type: Number, default: 10656 }
});
// Counter Collection
let Counter = mongoose.model("counter", CounterSchema);
// ----Pre Hook Function layout----
UserSchema.pre("save", function(next) {
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
module.exports = User = mongoose.model("user", UserSchema);
