const express = require("express");
const {
  createQuestion,
  getQuestion,
} = require("@Modules/questions/controller");
const { authGard } = require("@Common/middleware/auth.middleware");

const router = express.Router();

router.post("/", authGard, createQuestion);
router.get("/:questionId", authGard, getQuestion);

module.exports = router;
