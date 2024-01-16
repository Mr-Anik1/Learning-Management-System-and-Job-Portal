const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 350,
      required: true,
      trim: true,
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
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
    },
    imageId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000,
    },
    price: {
      type: Number,
      default: 0,
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
    paid: {
      type: String,
      enum: {
        values: ["PAID", "NOT_PAID", "HALF_PAID"],
        message:
          "Invalid payment status: {VALUE}. Allowed values are: PAID, NOT_PAID, HALF_PAID",
      },
      default: "NOT_PAID",
      uppercase: true,
      trim: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: Number,
      default: 0,
    },
    enrolls: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        stars: Number,
        comments: String,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, id: true }
);

const Course = model("Course", courseSchema);

module.exports = { Course };
