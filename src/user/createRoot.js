import userRepository, { USER_ROLE } from "./userRepository.js";
import { assoc, pick, pipe } from "ramda";
import userSchema from "./userSchema.js";

export default async function createRoot(req, res) {
  const pristine = await userRepository.isEmpty();
  if (!pristine) {
    return res.status(401).send();
  }
  await userRepository.set(
    req.body.username,
    pipe(
      pick(["username", "password"], req.body),
      assoc("role", USER_ROLE.ADMIN),
    ),
  );
  return res.status(204).send();
}
createRoot.option = { schema: { body: userSchema } };
