export const itemSchemaTpl = {
  $id: "itemSchema",
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" }
  },
  required: ["id", "title", "description"],
};