const request = require("supertest");
const app = require("app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Question = require("@Modules/questions/models/Question");
dotenv.config();

// Dummy user ID for testing
const userEmail = "test@gmail.com";
const userPassword = "pass123";
let token = "";

beforeAll(async () => {
  // Connect to a test database (you can use a mock database or an actual test database)
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const response = await request(app).post("/api/auth/login").send({
    email: userEmail,
    password: userPassword,
  });

  token = response.token;
});

afterAll(async () => {
  // Disconnect mongoose after all tests are done
  await mongoose.disconnect();
});

describe("POST /api/questions", () => {
  it("should create a new question", async () => {
    const questionContent = "What is the capital of France?";

    // Make a POST request to create a new question
    const response = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: questionContent })
      .expect(201);

    // Check if the response body contains the created question
    expect(response.body).toHaveProperty("content", questionContent);
    expect(response.body).toHaveProperty("answer");

    // Check if the question is saved in the database
    const question = await Question.findById(response.body._id);
    expect(question).toBeTruthy();
    expect(question.userId).toBe(userId);
    expect(question.content).toBe(questionContent);
    expect(question.answer).toBeTruthy();
  });
});

describe("GET /api/questions/:questionId", () => {
  it("should retrieve a question by ID", async () => {
    const questionContent = "What is the capital of Italy?";
    const newQuestion = await Question.create({
      userId,
      question: questionContent,
      answer: "Rome",
    });

    // Make a GET request to retrieve the question by ID
    const response = await request(app)
      .get(`/api/questions/${newQuestion._id}`)
      .expect(200);

    // Check if the response body matches the created question
    expect(response.body._id).toEqual(newQuestion._id.toString());
    expect(response.body.userId).toBe(userId);
    expect(response.body.content).toBe(questionContent);
  });

  it("should return 404 if question ID does not exist", async () => {
    const nonExistentQuestionId = mongoose.Types.ObjectId(); // Generate a non-existent ObjectId

    // Make a GET request with a non-existent question ID
    await request(app)
      .get(`/api/questions/${nonExistentQuestionId}`)
      .expect(404);
  });
});
