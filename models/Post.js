const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Post / Comment Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    // One To Many Relationship with the users table - Connects user to their corresponding posts
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  //   if the like a comment the user id goes into the array
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        // Likes reference usersId
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        require: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
// Export the Model to server -> Database ->
module.exports = Post = mongoose.model("post", PostSchema);
