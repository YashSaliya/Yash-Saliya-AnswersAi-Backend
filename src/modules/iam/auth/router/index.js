const express = require("express");
const {
  login,
  logout,
  refreshToken,
  register,
} = require("@Modules/iam/auth/controller");
const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/register", register);

module.exports = router;
