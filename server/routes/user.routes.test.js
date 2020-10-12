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
    const user = {
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    };
    const res = await request(app).post("/api/users").type("form").send({
      user,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(user.email);
  });

  it("Post error same email", async () => {
    const user = {
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    };

    await request(app).post("/api/users").type("form").send({ user });

    const res = await request(app)
      .post("/api/users")
      .type("form")
      .send({ user });
    expect(res.statusCode).toEqual(503);
    expect(res.body).toHaveProperty("message");
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

describe("UPDATE /users/:userId", () => {
  it("User not found to update", async () => {
    const user = {
      name: "Pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    };
    const res = await request(app)
      .put("/api/users/5f81b6382fab1742becf1675")
      .type("form")
      .send({ user });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });

  it("User update success", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });
    const userToUpdate = {
      name: "Editado",
    };
    await newUser.save();
    const res = await request(app)
      .put(`/api/users/${newUser._id}`)
      .type("form")
      .send({ user: userToUpdate });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.name).toBe(userToUpdate.name);
  });

  it("User update fails to update email taken", async () => {
    const newUser = new User({
      name: "pepe",
      lastName: "Juan",
      email: "a@a.com",
      phoneNumber: "65456543546",
    });

    const newUser2 = new User({
      name: "pepe",
      lastName: "Juan",
      email: "b@b.com",
      phoneNumber: "65456543546",
    });

    await newUser.save();
    await newUser2.save();

    const userToUpdate = {
      email: "a@a.com",
    };

    const res = await request(app)
      .put(`/api/users/${newUser2._id}`)
      .type("form")
      .send({ user: userToUpdate });
    expect(res.statusCode).toEqual(503);
    console.log(res.body.message);
    expect(res.body).toHaveProperty("message");
  });
});
