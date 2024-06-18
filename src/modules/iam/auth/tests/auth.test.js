const request = require("supertest");
const mongoose = require("mongoose");
const app = require("app");
const User = require("@Modules/iam/users/models/User");

const userDataValid = {
  email: "test@example.com",
  password: "password123",
};

const userDataInValid = {
  email: "test@example.com",
  password: "password12345",
};

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(userDataValid);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });

    it("should not register a user with existing email", async () => {
      await User.create(userDataValid);

      const response = await request(app)
        .post("/api/auth/register")
        .send(userDataValid);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login an existing user", async () => {
      await User.create(userDataValid);

      const response = await request(app)
        .post("/api/auth/login")
        .send(userDataValid);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should not login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(userDataInValid);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });
});
