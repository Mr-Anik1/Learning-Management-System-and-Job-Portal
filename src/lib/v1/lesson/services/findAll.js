const { Lesson } = require("../../../../models");
const { errors } = require("../../../../errors");
const defaults = require("../../../../config/defaults");
const { isValidObjectId } = require("../../../../utils");

const findAll = async ({
  courseId,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  category = defaults.category,
}) => {
  try {
    // If courseId doesn't pass then throw an error
    if (!courseId) {
      throw new errors.BadRequestError(`Invalid Credentials.`);
    }

    // First check courseId is a valid mongodb id or not
    isValidObjectId({ id: courseId, nameOfId: "courseID" });

    // Create essential string for sorting
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

    // Generate filtering
    const filter = {
      title: { $regex: search, $options: "i" },
      category: { $regex: category, $options: "i" },
    };

    // Find all lessons
    const lessons = await Lesson.where({ courseId })
      .find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of lessons doesn't exist or is empty
    if (!lessons || lessons.length === 0) {
      throw new errors.NotFoundError(`Your requested resource doesn't exist`);
    }

    // Return the array of lessons
    return lessons;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_LESSONS]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Something Went Wrong.`);
  }
};

module.exports = { findAll };
