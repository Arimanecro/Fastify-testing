import { regSchema } from "../schemas/post.js";
const itemOpts = {
  schema: regSchema,
  handler: (req, reply) => {
      if(!req.file) 
      return reply.status(400).send("Field Avatar is required!");
      reply.send("Success");
  },
};
export default async (app, opts, done) => {
  app.post("/registration", {
    preValidation: app.multer.single("avatar"), ...itemOpts},
  );
  done();
};