import Fastify from "fastify";
import Redis from "ioredis";
import fs from "fs/promises";

const redis = new Redis(6379, process.env.REDIS_HOST || "localhost");
redis.set("mykey", "myvalue");

fs.writeFile("storage/test.txt", "mounting test");

const fastify = Fastify({ logger: true });
fastify.get("/health", async (req, res) => {
  const myValue = await redis.get("mykey");
  res.send({ msg: myValue });
});
fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
