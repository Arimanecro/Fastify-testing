import fp from "fastify-plugin";
import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

async function ajvInstance(fastify, opts, done) {
  const func = async () => {
    const ajv = new Ajv({
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: true,
      allErrors: true,
    });

    ajvFormats(ajv);
    ajvErrors(ajv);

    fastify.setValidatorCompiler((opt) => ajv.compile(opt.schema));
    fastify.setErrorHandler((error, request, reply) => {
      if(error && error?.name == "MulterError"){
        reply.status(400).send(error.message);
      }
      if (error.validation) {
        let errors = error.validation.flatMap((e) => [e.message]);
        reply.status(400).send(errors);
        return;
      }
    });
  };

  fastify.register(func).after(fastify.pluginReady("AJV has been loaded"));;
}
export default fp(ajvInstance, {
  name: "ajvInstance",
});
