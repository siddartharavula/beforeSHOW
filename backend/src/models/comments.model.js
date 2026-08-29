const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  comment: {
    type: String,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

commentSchema.index(
  { user: 1, movie: 1 },
  { unique: true }
);

const commentsModel= mongoose.model("Comments",commentSchema);

module.exports=commentsModel;
