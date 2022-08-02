import path from "path";
import multer from "fastify-multer";
import fp from "fastify-plugin";
// https://www.geeksforgeeks.org/file-uploading-in-node-js/

class MulterError extends Error {
  constructor(message) {
    super(message);
    this.name = "MulterError";
  }
}

async function multipart_form(fastify, opts) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/static/img`);
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extName);
    },
  });
  const fileFilter = (request, file, cb) => {
    const allowed = ["image/jpeg", "image/png"];
    if(!allowed.includes(file.mimetype)) {
      return cb(new MulterError('Forbidden format'));
    }
    cb(null, true);
  } 
  const limits = {fileSize: 100_000};
  const upload = multer({ storage, fileFilter, limits});
  fastify.decorate("multer", upload);
  fastify
    .register(multer.contentParser)
    .after(fastify.pluginReady("Multer has been loaded"));
}
export default fp(multipart_form, {
  name: "multipart_form",
});
