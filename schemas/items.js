const itemsSchema = {
  description: 'All items',
  response: {
    200: {
      type: "array",
      items: {
        $ref: 'itemSchema'
      },
    },
  },
};

const itemSchema = {
  description: 'Get item by ID',
  params: {
    id: { type: "string" }
  },
  response: {
    200: {
      $ref: 'itemSchema'
  }
}
};

export { itemsSchema, itemSchema };
