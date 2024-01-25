const { Schema, model } = require("mongoose");

const qnaCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const QnaComment = model("QnaComment", qnaCommentSchema);

module.exports = { QnaComment };
