import { bodySchema } from "../schemas/post.js";

const itemOpts = {
  schema: bodySchema,
  handler: (req, reply) => {
    let { name, message } = req.body;
    reply.send({ name, message });
  },
};
export default async (app, opts, done) => {
  app.get("/", async (_, reply) => {
    return reply.sendFile("index.html");
  });
  app.post("/", itemOpts)
  done();
};
