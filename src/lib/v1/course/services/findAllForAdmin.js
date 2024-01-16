const { Course } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");

const findAllForAdmin = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  status = defaults.status,
  category = defaults.category,
  paid = defaults.paid,
}) => {
  try {
    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      title: { $regex: search, $options: "i" },
      status: { $regex: status, $options: "i" },
      category: { $regex: category, $options: "i" },
      paid: { $regex: paid, $options: "i" },
    };

    // Find all courses for admin
    const courses = await Course.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .select("-imageId")
      .populate({
        path: "instructor",
        select: "_id firstname lastname profilePicture email profession role",
      });

    // If the array of courses doesn't exist or is empty
    if (!courses || courses.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of courses
    return courses;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND-ALL-FOR-ADMIN_COURSES]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAllForAdmin };
