const authService = require("@Modules/iam/auth/services");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login(email, password);

  if (!token) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ token, user });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  const token = authService.refreshToken(refreshToken);

  if (!token) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  res.json({ token });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.register(email, password);

    if (!token) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
