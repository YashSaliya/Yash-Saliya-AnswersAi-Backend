const express = require("express");
const {
  getUserProfile,
  getUserQuestions,
} = require("@Modules/iam/users/controller");
const { authGard } = require("@Common/middleware/auth.middleware");
const router = express.Router();

router.get("/:userId", authGard, getUserProfile);
router.get("/:userId/questions", authGard, getUserQuestions);

module.exports = router;
