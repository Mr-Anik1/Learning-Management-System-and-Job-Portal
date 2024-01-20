const { Lesson } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and categoryType doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single lesson
    const lesson = await Lesson.findOne({
      slug,
      categorySlug: categoryType,
    });

    // If lesson doesn't exist
    if (!lesson) {
      throw Error;
    }

    // Find simillar lesson topic with categorySlug
    const lessonTopic = await Lesson.find({
      categorySlug: categoryType,
    }).select("title slug categorySlug freePreview");

    return { lesson, lessonTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_LESSON]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
