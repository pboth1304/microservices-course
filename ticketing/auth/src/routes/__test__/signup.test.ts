import request from "supertest";
import { app } from "../../app";

it("should return a 201 on sucessful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.de",
      password: "password",
    })
    .expect(201);
});

it("should return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("should return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.de",
      password: "p",
    })
    .expect(400);
});

it("should return a 400 with a missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.de" })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("should not allow duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.de", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.de", password: "password" })
    .expect(400);
});

it("should set cookie after successful signup", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.de", password: "password" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
