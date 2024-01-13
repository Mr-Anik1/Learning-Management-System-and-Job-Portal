const { Schema, model } = require("mongoose");

const blogCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const BlogCategory = model("BlogCategory", blogCategorySchema);

module.exports = { BlogCategory };
