import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signin } from "../../test/setup";

it("should has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("should only be accessed if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("should return a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("should return an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ price: 10 })
    .expect(400);
});

it("should return an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "test", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "test" })
    .expect(400);
});

it("should create a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "asd", price: 20 })
    .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual("asd");
});
