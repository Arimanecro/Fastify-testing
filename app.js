import fastify from "fastify";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pluginReady = (msg) => (err) =>
  (() => (err ? console.error(err) : console.info(msg)))();


export default (opts) => {
    const app = fastify(opts);
    app.decorate("pluginReady", pluginReady);

    app
      .register(import("fastify-autoload"), {
        dir: join(__dirname, "plugins"),
      })
      .register(import("fastify-autoload"), {
        dir: join(__dirname, "routes"),
      })
      .ready(() => {
        app.pluginReady("All plugins loaded succesfully");
        (app.config.NODE_ENV !== 'production') ? console.log(app.printRoutes()) : null;
        app.listen(app.config.PORT, (err, address) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
        });
      });

      return app;
}