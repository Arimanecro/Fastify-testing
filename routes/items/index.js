import { itemsSchema, itemSchema } from "../../schemas/items.js";
import { itemsHandler, itemHandler } from "../../handlers/items.js";
import { itemSchemaTpl } from "../../schemas/templates.js";

const itemsOpts = {
  schema: itemsSchema,
  handler: itemsHandler
};
const itemOpts = {
    schema: itemSchema,
    handler: itemHandler
  };

export default async (app,  opts, done) => {
  app.addSchema(itemSchemaTpl);
  app.get("/", itemsOpts);
  app.get("/:id", itemOpts);
  done();
};
