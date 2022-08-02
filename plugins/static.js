import { join } from "path";
import fp from "fastify-plugin";
import fastifyStatic from "fastify-static";

async function loadingStaticFiles(fastify, opts) {
  fastify.register(fastifyStatic, {
        root: [join(process.cwd(), "/static/pages"), join(process.cwd(), "/static/img")],
  })
  .after(fastify.pluginReady("Fastify-static has been loaded"));
}
export default fp(loadingStaticFiles, {
  name: "loadingStaticFiles",
});
