// Fastify wiil use plugin fastify-formbody
import fastifyFormbody from "fastify-formbody";
import fp from "fastify-plugin";

async function x_www_form_urlencoded(fastify, opts) {
  fastify.register(fastifyFormbody)
  .after(fastify.pluginReady("Fastify-formbody has been loaded"));
}
export default fp(x_www_form_urlencoded, {
  name: "x_www_form_urlencoded",
});