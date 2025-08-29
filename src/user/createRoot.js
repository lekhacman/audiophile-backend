import userRepository, { USER_ROLE } from "./userRepository.js";
import userSchema from "./userSchema.js";

export default async function createRoot(req, res) {
  const pristine = await userRepository.isEmpty();
  if (!pristine) {
    return res.status(401).send();
  }
  await userRepository.set(req.body.username, {
    ...req.body,
    role: USER_ROLE.ADMIN,
  });
  return res.status(204).send();
}
createRoot.options = { schema: { body: userSchema } };
