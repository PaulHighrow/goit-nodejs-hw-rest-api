require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const connectDB = require("../../db/connection");
const asyncWrapper = require("../../helpers/asyncWrapper");
const login = require("./login");

describe("test login", () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("response status is 200", async () => {
    const resp = await supertest(app)
      .post("/users/login", asyncWrapper(login))
      .send({
        email: "Userfortests@gmail.uta",
        password: "Tests01;",
      });
    expect(resp.statusCode).toBe(200);
  });

  test("returns valid authorization token", async () => {
    const resp = await supertest(app)
      .post("/users/login", asyncWrapper(login))
      .send({
        email: "AnotherUserForTests@gmail.com",
        password: "Tests02;",
      });
    expect(resp.body.token).toBeDefined();
    expect(typeof resp.body.token).toBe("string");
  });

  test("returns valid 'user' Object, containing fields 'email' and 'subscription'", async () => {
    const resp = await supertest(app)
      .post("/users/login", asyncWrapper(login))
      .send({
        email: "YetAnotherUserForTests@gmail.com",
        password: "Tests03;",
      });
    expect(resp.body.user).toBeDefined();
    expect(typeof resp.body.user).toBe("object");
    expect(resp.body.user.email).toBeDefined();
    expect(typeof resp.body.user.email).toBe("string");
    expect(resp.body.user.subscription).toBeDefined();
    expect(typeof resp.body.user.subscription).toBe("string");
  });
});
