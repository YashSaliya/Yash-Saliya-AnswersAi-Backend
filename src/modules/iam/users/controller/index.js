const userService = require("@Modules/iam/users/services");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserQuestions = async (req, res) => {
  try {
    const response = await userService.getUserQuestions(req.params.userId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
