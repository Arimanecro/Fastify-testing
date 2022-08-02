import fp from "fastify-plugin";
import fastifyEnv from "fastify-env";

async function loadingEnvironment(fastify, opts, done) {
  fastify
    .register(fastifyEnv, {
      schema: {
        type: "object",
        required: ["PORT", "NODE_ENV", "HOST", "JWT_SECRET"],
        properties: {
          PORT: {
            type: "string",
            default: 3000,
          },
          HOST: {
            type: "string",
            default: "http://localhost:3000"
          },
          JWT_SECRET: {
            type: "string",
            default: "fastest-framework-111"
          },
          NODE_ENV: {
            type: "string",
            default: "development"
          }
        },
      },
      dotenv: true
    })
    .after(fastify.pluginReady("Fastify-env has been loaded"));
}
export default fp(loadingEnvironment, {
  name: "loadingEnvironment",
});
