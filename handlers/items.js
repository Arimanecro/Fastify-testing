var posts = [
  { id: "1", title: "Title-1", description: "This is post one" },
  { id: "2", title: "Title-2", description: "This is post two" },
  { id: "3", title: "Title-3", description: "This is post three" },
];

const itemsHandler = (_, reply) => {
  return reply.send(posts);
};

const itemHandler = (req, reply) => {
  const { id } = req.params;
  var match = {};

  for (const v of posts) {
    if (v.id === id) {
      match = v;
      break;
    }
  }

  if (Reflect.ownKeys(match).length === 0) {
    return reply.status(404).send({
      errorMsg: "ID not found",
    });
  }

  reply.send(match);
};

export { itemsHandler, itemHandler };
