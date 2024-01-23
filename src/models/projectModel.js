const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "APPROVED", "DECLINED"],
        message:
          "{VALUE} is not supported. Allowed values are: PENDING, APPROVED, DECLINED",
      },
      default: "PENDING",
      uppercase: true,
      trim: true,
      index: true,
    },
    links: [
      {
        name: String,
        url: String,
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
    },
    images: [],
    imagesId: [],
    techStack: [],
    keywords: [],
  },
  { timestamps: true, id: true }
);

const Project = model("Project", projectSchema);

module.exports = { Project };
