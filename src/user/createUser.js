import userSchema from "./userSchema.js";
import userRepository from "./userRepository.js";

export default async function createUser(req, res) {
  await userRepository.set(req.body.username, req.body);
  return res.status(201).send();
}
createUser.options = { schema: { body: userSchema } };
