const { errors } = require("../../../../errors");
const { Course } = require("../../../../models");

const findSingle = async ({ slug, categoryType }) => {
  // If slug and categoryType doesn't pass
  if (!slug || !categoryType) {
    throw new errors.BadRequestError(`Invalid Credentials.`);
  }

  try {
    // Find a single course
    const course = await Course.findOne({
      slug,
      categorySlug: categoryType,
    })
      .select("-imageId")
      .populate({
        path: "instructor",
        select: "_id firstname lastname profilePicture email profession role",
      });

    // Find simillar course topic with categorySlug
    const courseTopic = await Course.find({
      categorySlug: categoryType,
    }).select("title slug categorySlug image price");

    // If course doesn't exist
    if (!course) {
      throw Error;
    }

    return { course, courseTopic };
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_COURSE]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested Resource Doesn't Exist`);
  }
};

module.exports = { findSingle };
