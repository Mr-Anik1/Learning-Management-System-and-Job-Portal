// All models have been imported
const { User } = require("./UserModel");
const { TutorialCategory } = require("./TutorialCategoryModel");
const { Tutorial } = require("./TutorialModel");
const { NewsLetter } = require("./NewsLetterModel");
const { Review } = require("./ReviewModel");
const { Contact } = require("./ContactModel");
const { Video } = require("./VideoModel");
const { VideoCategory } = require("./VideoCategoryModel");
const { Documentation } = require("./DocumentationModel");
const { DocumentationCategory } = require("./DocumentationCategoryModel");
const { Blog } = require("./BlogModel");
const { BlogCategory } = require("./BlogCategoryModel");
const { Course } = require("./CourseModel");
const { CourseCategory } = require("./CourseCategoryModel");

// All models have been exported
module.exports = {
  User,
  TutorialCategory,
  Tutorial,
  NewsLetter,
  Review,
  Contact,
  Video,
  VideoCategory,
  Documentation,
  DocumentationCategory,
  Blog,
  BlogCategory,
  Course,
  CourseCategory,
};
