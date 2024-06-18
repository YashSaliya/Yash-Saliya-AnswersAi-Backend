const { ChatOpenAI } = require("@langchain/openai");
require("dotenv").config();
const Question = require("@Modules/questions/models/Question");

exports.createQuestion = async (userId, content) => {
  try {
    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-3.5-turbo",
    });
    const response = await model.invoke(content);
    const answerContent = response.content.trim();
    const question = await new Question({
      question: content,
      answer: answerContent,
      userId,
    }).save();
    return { question: content, answer: answerContent };
  } catch (error) {
    return null;
  }
};

exports.getQuestionById = async (questionId) => {
  try {
    const question = await Question.findById(questionId);
    return question;
  } catch (error) {
    return null;
  }
};
