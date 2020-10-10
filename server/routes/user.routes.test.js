const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../database/models");
const dbTestHandler = require("../database/testHandler");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbTestHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbTestHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbTestHandler.closeDatabase());

describe("GET /users", () => {
  it("Empty array", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
    expect(res.body.users.length).toEqual(0);
  });

  it("Contains 1 user", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });
    await newUser.save();
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
    expect(res.body.users[0].email).toBe(newUser.email);
  });
});

describe("GET /users/:userId", () => {
  it("Empty user", async () => {
    const res = await request(app).get("/api/users/5f81b6382fab1742becf1675");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body.user).toBe(null);
  });

  it("Get success user", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });
    await newUser.save();

    const res = await request(app).get(`/api/users/${newUser._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(newUser.email);
  });
});

describe("POST /users", () => {
  it("Post success user", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });

    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(newUser.email);
  });

  it("Post error same email", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });

    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty("message");
    expect(res.body.user.email).toBe(newUser.email);
  });
});

describe("DELETE /users/:userId", () => {
  it("User not found to delete", async () => {
    const res = await request(app).delete(
      "/api/users/5f81b6382fab1742becf1675"
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });

  it("User delete success", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });
    await newUser.save();
    const res = await request(app).delete(`/api/users/${newUser._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
