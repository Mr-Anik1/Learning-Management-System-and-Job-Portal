const { errors } = require("../../../../errors");
const { isValidObjectId } = require("../../../../utils");
const { courseServicesV1 } = require("../../course");
const { singleLessonById } = require("./singleLessonById");
const { Lesson } = require("../../../../models");

const remove = async ({ courseId, lessonId }) => {
  // If courseId and lessonId doesn't pass then throw a BadRequestError
  if (!courseId || !lessonId) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Check courseId is valid or not
  isValidObjectId({ id: courseId, nameOfId: "Course ID" });

  // Check lessonId is valid or not
  isValidObjectId({ id: lessonId, nameOfId: "Lesson ID" });

  try {
    // Find lesson
    const isExistLesson = await singleLessonById({ lessonId });

    // If lesson doesn't exist.
    if (!isExistLesson) {
      throw new errors.NotFoundError(`Your Requested Lesson Doesn't Exist`);
    }

    // Now check does the courseId has exist to this isExistLesson. If the courseId doesn't exist this isExistLesson then throw a error.
    if (isExistLesson.courseId.toString() !== courseId) {
      throw new errors.BadRequestError(
        `Wrong input! This lesson doesn't under of this course.`
      );
    }

    // If lesson is exist and the lesson is under of the course, then delete the lesson form the course.
    const deleteLessonFromCourse = await courseServicesV1.update({
      courseId,
      pullLessonId: lessonId,
    });

    // If course doesn't exist
    if (!deleteLessonFromCourse) {
      throw new errors.NotFoundError(`Your Requested Course Doesn't Exist`);
    }

    // If lesson is deleted from the course successfully, then delete the lesson from the DataBase.
    await Lesson.findByIdAndDelete(lessonId);

    // If the lesson is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_LESSON]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err instanceof errors.NotFoundError) {
      throw new errors.NotFoundError(err.message);
    }

    // If error is instance of BadRequestError
    if (err instanceof errors.BadRequestError) {
      throw new errors.BadRequestError(err.message);
    }

    throw new errors.InternalServerError("Lesson Deletion Failed");
  }
};

module.exports = { remove };
