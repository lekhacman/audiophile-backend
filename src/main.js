import Fastify from "fastify";

const fastify = Fastify({ logger: true });
fastify.get("/", (req, res) => {
  res.send({ msg: "Hello World!" });
});
fastify.listen({ port: 5000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
