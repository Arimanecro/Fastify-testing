import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";

async function jwtCreate(fastify, opts, done) {
  const myCustomMessages = {
    badRequestErrorMessage: "Format is Authorization: Bearer [token]",
    noAuthorizationInHeaderMessage: "Autorization header is missing!",
    authorizationTokenExpiredMessage: "Authorization token expired",
    // for the below message you can pass a sync function that must return a string as shown or a string
    authorizationTokenInvalid: (err) => {
      return `Authorization token is invalid: ${err.message}`;
    },
  };
  fastify
    .register(fastifyJwt, {
      secret: fastify.config.JWT_SECRET,
      messages: myCustomMessages,
      cookie: {
        cookieName: "token",
      },
    })
    .after(fastify.pluginReady("Fastify-JWT has been loaded"));

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err.message);
    }
  });
}
export default fp(jwtCreate, {
  name: "jwtCreate",
});
