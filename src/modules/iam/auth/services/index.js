const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("@Modules/iam/users/models/User");
const { generateToken } = require("@Common/utils/tokenGenerator");

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    return { token, user };
  }

  return { token: null, user: null };
};

exports.refreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    return generateToken(decoded.id);
  } catch (error) {
    return null;
  }
};

exports.register = async (email, password) => {
  let user = await User.findOne({ email });

  if (user) {
    return { token: null, user: null };
  }

  user = new User({
    email,
    password,
  }).save();

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  return { token: generateToken(user.id), user };
};
