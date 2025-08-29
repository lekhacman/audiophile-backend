import userSchema from "../user/userSchema.js";
import userRepository, { hash } from "../user/userRepository.js";
import sessionRepository, { KEY } from "./sessionRepository.js";
import { pick } from "ramda";

export default async function login(req, res) {
  /** @type {User} */
  const user = await userRepository.get(req.body.username);
  if (!user) {
    return res.status(404).send("No such user");
  }
  if (user.password !== (await hash(req.body.password, user.salt))) {
    return res.status(401).send("Wrong password leh");
  }

  const sessionId =
    (await sessionRepository.getSessionIdByUsername(user.username)) ||
    crypto.randomUUID();
  await sessionRepository.set(sessionId, pick(["username", "role"], user));
  await sessionRepository.expire(sessionId, 5 * 60);

  res.setCookie(KEY.SESSION_ID, sessionId, { httpOnly: true, path: "/" });
  return res.send("login");
}
login.options = { schema: userSchema };
