const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("module-alias/register");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("@Modules/iam/auth/router");
const userRoutes = require("@Modules/iam/users/router");
const questionRoutes = require("@Modules/questions/router");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server Setup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("MongoDB disconnected through app termination");
      process.exit(0);
    });
  });
});

module.exports = app;
