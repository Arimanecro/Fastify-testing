import fp from "fastify-plugin";
import fastifycookie from "fastify-cookie";

async function createCookie(fastify, opts, done) {
  fastify
    .register(fastifycookie)
    .after(fastify.pluginReady("Fastify-cookie has been loaded"));
}
export default fp(createCookie, {
  name: "createCookie",
});
