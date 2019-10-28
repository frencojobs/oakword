const fastify = require("fastify")();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public")
});

fastify.listen(process.env.PORT_FRONTEND, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});
