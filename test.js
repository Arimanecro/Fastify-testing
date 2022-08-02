// Testing sending data as:
// - JSON,
// - x-www-form-urlencoded
// - multipart/form-data
// - JWT

import fs from "fs";
import test from "tape";
import FormData from "form-data";
import app from "./app.js";

const server = app();

test("Index page", async ({ deepEqual }) => {
  const res = await server.inject("/");
  deepEqual(res.statusCode, 200);
});

test("All items", async ({ deepEqual }) => {
  let posts = [
    { id: "1", title: "Title-1", description: "This is post one" },
    { id: "2", title: "Title-2", description: "This is post two" },
    { id: "3", title: "Title-3", description: "This is post three" },
  ];
  const res = await server.inject("/items");
  deepEqual(posts, res.json());
});

test("Item with id 3", async ({ deepEqual }) => {
  let posts = { id: "3", title: "Title-3", description: "This is post three" };
  const res = await server.inject("/items/3");
  deepEqual(posts, res.json());
});

test("JSON", async ({ deepEqual }) => {
  const payload = { name: "John Doe", message: "My wife is Jane Doe" };
  await server
    .inject({
      url: "/",
      method: "POST",
      payload,
    })
    .then((response) => {
      deepEqual(response.json(), payload);
    })
    .catch((err) => console.error(err));
});

test("Field name minimum 4 characters!", async ({ deepEqual }) => {
  const payload = { name: "Doe", message: "My wife is Jane Doe" };
  await server
    .inject({
      url: "/",
      method: "POST",
      payload,
    })
    .then((response) => {
      deepEqual(response.body, '["Field \\"name\\" minimum 4 characters!"]');
    })
    .catch((err) => console.error(err));
});

test("Required property message", async ({ deepEqual }) => {
  const payload = { name: "John Doe" };
  await server
    .inject({
      url: "/",
      method: "POST",
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "[\"must have required property 'message'\"]");
    })
    .catch((err) => console.error(err));
});

test("x-www-form-urlencoded", async ({ deepEqual }) => {
  const payload = { name: "John Doe", message: "My wife is Jane Doe" };
  await server
    .inject({
      url: "/x-www-form",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      payload: new URLSearchParams(payload).toString(),
    })
    .then((response) => {
      deepEqual(response.json(), payload);
    })
    .catch((err) => console.error(err));
});

test("multipart/form-data: Incorrect email", async ({ deepEqual }) => {
  let payload = new FormData();
  payload.append("email", "fake");
  payload.append("username", "John Doe");
  payload.append("password", "0123456789abc");

  await server
    .inject({
      url: "/registration",
      method: "POST",
      headers: payload.getHeaders(),
      payload,
    })
    .then((response) => {
      deepEqual(response.json(), ["Incorrect email format"]);
    })
    .catch((err) => console.error(err));
});

test("multipart/form-data: Upload avatar", async ({ deepEqual }) => {
  let payload = new FormData();
  payload.append("email", "john@gmail.com");
  payload.append("username", "John Doe");
  payload.append("password", "0123456789abc");
  payload.append("avatar", fs.createReadStream("./static/img/test.jpg"));

  await server
    .inject({
      url: "/registration",
      method: "POST",
      headers: payload.getHeaders(),
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "Success");
    })
    .catch((err) => console.error(err));
});

test("multipart/form-data: Avatar is required!", async ({ deepEqual }) => {
  let payload = new FormData();
  payload.append("email", "john@gmail.com");
  payload.append("username", "John Doe");
  payload.append("password", "0123456789abc");

  await server
    .inject({
      url: "/registration",
      method: "POST",
      headers: payload.getHeaders(),
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "Field Avatar is required!");
    })
    .catch((err) => console.error(err));
});

test("multipart/form-data: Forbidden format!", async ({ deepEqual }) => {
  let payload = new FormData();
  payload.append("email", "john@gmail.com");
  payload.append("username", "John Doe");
  payload.append("password", "0123456789abc");
  payload.append(
    "avatar",
    fs.createReadStream("./static/forbidden-format.txt")
  );

  await server
    .inject({
      url: "/registration",
      method: "POST",
      headers: payload.getHeaders(),
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "Forbidden format");
    })
    .catch((err) => console.error(err));
});

test("multipart/form-data: Big file!", async ({ deepEqual }) => {
  let payload = new FormData();
  payload.append("email", "john@gmail.com");
  payload.append("username", "John Doe");
  payload.append("password", "0123456789abc");
  payload.append("avatar", fs.createReadStream("./static/img/bigfile.jpg"));

  await server
    .inject({
      url: "/registration",
      method: "POST",
      headers: payload.getHeaders(),
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "File too large");
    })
    .catch((err) => console.error(err));
});

test("JWT: Incorrect login or password!", async ({ deepEqual }) => {
  const payload = { username: "user", password: "user" };
  await server
    .inject({
      url: "/login",
      method: "POST",
      payload,
    })
    .then((response) => {
      deepEqual(response.body, "Incorrect login or password!");
    })
    .catch((err) => console.error(err));
});

test("JWT: Authenticated user", async ({ deepEqual }) => {
  const payload = { username: "admin", password: "admin" };

  const { body: token } = await server.inject({
    url: "/login",
    method: "POST",
    payload,
  });

  await server
    .inject({
      url: "/admin",
      method: "GET",
      cookies: { token },
    })
    .then((response) => {
      deepEqual(response.body, "Authenticated user");
    });
});

test("JWT: Unauthenticated user", async ({ deepEqual }) => {
  await server
    .inject({
      url: "/admin",
      method: "GET"
    })
    .then((response) => {
      deepEqual(response.body, "No Authorization was found in request.cookies");
    });

  await server.close();
});
