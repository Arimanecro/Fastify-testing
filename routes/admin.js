export default (app, opts, done) => {
   app.get("/admin",     {
    onRequest: [app.authenticate]
  }, async (req, reply) => {
    reply.send("Authenticated user");
  });
  done();
};