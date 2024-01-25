const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    upVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
    downVotes: [
      {
        name: String,
        createdAt: String,
      },
    ],
  },
  { timestamps: true, id: true }
);

const Answer = model("Answer", answerSchema);

module.exports = { Answer };
