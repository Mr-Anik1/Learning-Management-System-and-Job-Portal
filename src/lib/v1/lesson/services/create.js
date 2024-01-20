const { Lesson } = require("../../../../models");
const { errors } = require("../../../../errors");
const { courseServicesV1 } = require("../../course");
const { isValidObjectId } = require("../../../../utils");

const create = async ({
  courseId,
  title,
  slug,
  category,
  categorySlug,
  instructor,
}) => {
  // If required filds doesn't exists
  if (
    !courseId ||
    !title ||
    !slug ||
    !category ||
    !categorySlug ||
    !instructor
  ) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check courseId is a valid mongodb ID or not.
  isValidObjectId({ id: courseId, nameOfId: "CourseID" });

  // Generate createQuery object for create a new lesson
  const createQuery = {
    title,
    slug,
    category,
    categorySlug,
    instructor,
  };

  // If something went wrong in the try block then this lessonId will be needed.
  let lessonId;

  try {
    // Find course by its courseId
    const course = await courseServicesV1.singleCourseById({ courseId });

    // If course doesn't exist
    if (!course) {
      throw new errors.NotFoundError(`Course doesn't exist with this courseId`);
    }

    // If course is exist, create a new lesson
    const lesson = new Lesson(createQuery);
    await lesson.save();

    // If lesson doesn't create
    if (!lesson) {
      throw Error;
    }

    // Define what is newly created lesson id is.
    lessonId = lesson.id;

    /**
     * @Update_course_with_newly_created_lesson
     * Here this newly created lesson ID will push to the lessons array in the Course.
     */
    await courseServicesV1.update({
      id: courseId,
      pushLessonId: lessonId,
    });

    return lesson;
  } catch (err) {
    // If any error happend, newly created lesson will be deleted.
    if (lessonId) {
      await Lesson.findByIdAndDelete(lessonId);
    }

    if (err.message) {
      console.log(`[CREATE_LESSON]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Lesson Creation Failed`);
  }
};

module.exports = { create };
