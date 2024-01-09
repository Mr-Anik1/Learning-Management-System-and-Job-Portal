// All models have been imported
const { User } = require("./UserModel");
const { TutorialCategory } = require("./TutorialCategoryModel");
const { Tutorial } = require("./TutorialModel");
const { NewsLetter } = require("./NewsLetterModel");
const { Review } = require("./ReviewModel");
const { Contact } = require("./ContactModel");
const { Video } = require("./VideoModel");

// All models have been exported
module.exports = {
  User,
  TutorialCategory,
  Tutorial,
  NewsLetter,
  Review,
  Contact,
  Video,
};
