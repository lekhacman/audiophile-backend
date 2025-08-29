import { createRepository } from "../src/client/db.js";

function clearSession() {
  return createRepository({ id: "sessionIdByUsername" }).remove("admin");
}
function execute() {
  return Promise.all([clearSession()]);
}
execute().then(() => process.exit(0));
