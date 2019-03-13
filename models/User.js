const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
  },
  { userId: false }
);

UserSchema.plugin(AutoIncrement, {
  inc_field: "userId",
  disable_hooks: true
});

// model created & Exported
module.exports = User = mongoose.model("user", UserSchema);
