import Fastify from "fastify";

const fastify = Fastify({ logger: true });
fastify.get("/health", (req, res) => {
  res.send({ msg: "Server is up!" });
});
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
