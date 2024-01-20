const { Lesson } = require("../../../../models");
const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");

const update = async ({ lessonId, payload = {} }) => {
  // If lessonId doesn't pass then throw BadRequestError
  if (!lessonId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check id is valid or not
  isValidObjectId({ id: lessonId, nameOfId: "Update Lesson ID" });

  // Generate updateQuery Object for update a lesson
  const updateQuery = {};

  // Dynamically check which fields are valid and set them into updateQuery.
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  try {
    // Update lesson
    const lesson = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      updateQuery,
      {
        new: true,
        runValidators: true,
      }
    );

    // If lesson doesn't exist
    if (!lesson) {
      throw new errors.NotFoundError(`Your Requested Resource Doesn't Exist`);
    }

    return lesson;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_LESSON]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError("Lesson Update Failed");
  }
};

module.exports = { update };
