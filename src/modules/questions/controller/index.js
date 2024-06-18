const questionService = require("@Modules/questions/services");

exports.createQuestion = async (req, res) => {
  const { content } = req.body;
  const question = await questionService.createQuestion(req.user.id, content);

  if (!question) {
    return res.status(500).json({ message: "Error generating answer" });
  }

  res.status(201).json(question);
};

exports.getQuestion = async (req, res) => {
  const question = await questionService.getQuestionById(req.params.questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json(question);
};
