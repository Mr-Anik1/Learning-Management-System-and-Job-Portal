// All QNA models have been imported
const { QNA } = require("./QnaModel");
const { Question } = require("./QuestionModel");
const { Tags } = require("./TagsModel");
const { QnaComment } = require("./QnaCommentModel");
const { Answer } = require("./AnswerModel");

// All QNA models have been exported
module.exports = { QNA, Question, Tags, QnaComment, Answer };
