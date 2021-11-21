import request from "supertest";
import { app } from "../../app";
import { signup } from "../../test/auth-helper";

it("should respond with details about the current user", async () => {
  const cookie = await signup();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set(
      "Cookie",
      cookie,
    ).send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.de");
});

it("should respond with null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
