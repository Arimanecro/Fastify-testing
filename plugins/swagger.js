import fp from 'fastify-plugin';
import Swagger from 'fastify-swagger';

async function swaggerGenerator (fastify, opts) {
  fastify.register(Swagger, {
    routePrefix: "/docs",
    exposeRoute: fastify.config.NODE_ENV !== 'production',
    swagger: {
      info: {
        title: "Fastify API",
      },
      host: fastify.config.HOST,
      consumes: ['application/json'],
      produces: ['application/json', 'text/html'],
    },
  })
  .after(fastify.pluginReady("Fastify-swagger has been loaded"))
}
export default fp(swaggerGenerator, {
  name: 'swagger'
})