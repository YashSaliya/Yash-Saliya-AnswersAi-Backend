const request = require("supertest");
const User = require("@Modules/iam/users/models/User");
const app = require("jest.config");

describe("User API", () => {
  describe("GET /api/users/:userId", () => {
    let token;
    let userId;

    beforeEach(async () => {
      const res = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      });

      token = res.body.token;
      userId = res.body._id;
    });

    it("should get user profile", async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual("test@example.com");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .get(`/api/users/000000000000000000000000`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("User not found");
    });
  });
});
