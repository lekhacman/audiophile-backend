import Fastify from "fastify";
import range from "fastify-range";
import health from "./health.js";
import createRoot from "./user/createRoot.js";
import getAsset from "./asset/getAsset.js";
import createUser from "./user/createUser.js";
import login from "./authentication/login.js";
import authenticator from "./authentication/authenticator.js";
import protect from "./authentication/protect.js";
import { USER_ROLE } from "./user/userRepository.js";

const fastify = Fastify({ logger: true });

fastify.register(range, { throwOnInvalid: true });
fastify.register(authenticator);

fastify.get("/v1/health", health);
fastify.post("/v1/bootstrap", createRoot.option, createRoot);
fastify.post("/v1/login", login.option, login);
fastify.post(
  "/v1/user",
  createUser.option,
  protect(createUser, { role: USER_ROLE.ADMIN }),
);
fastify.get("/v1/asset/:id", protect(getAsset));

fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
