const User = require("@Modules/iam/users/models/User");
const Question = require("@Modules/questions/models/Question");

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const getUserQuestions = async (userId) => {
  return await Question.find(
    { userId },
    { question: true, answer: true, _id: true, createdAt: true }
  );
};

module.exports = {
  getUserById,
  getUserQuestions,
};
