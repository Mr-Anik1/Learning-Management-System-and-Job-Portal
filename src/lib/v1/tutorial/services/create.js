const { Tutorial } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  title,
  slug,
  tutorialCategory,
  tutorialCategorySlug,
  topicName,
  content,
  keywords,
}) => {
  // If any essential filds doesn't exist
  if (
    !title ||
    !slug ||
    !tutorialCategory ||
    !tutorialCategorySlug ||
    !topicName ||
    !content ||
    !keywords
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Generate createQuery object for create new tutorial
  const createQuery = {
    title,
    slug,
    tutorialCategory,
    tutorialCategorySlug,
    topicName,
    content,
    keywords,
  };

  try {
    // Create new tutorial
    const tutorial = new Tutorial(createQuery);
    await tutorial.save();

    // If new tutorial doesn't create
    if (!tutorial) {
      throw Error;
    }

    return tutorial;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_TUTORIAL]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Tutorial Creation Failed`);
  }
};

module.exports = { create };
