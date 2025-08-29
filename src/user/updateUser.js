import { passwordSchema, roleSchema, usernameSchema } from "./userSchema.js";
import userRepository from "./userRepository.js";

export default async function updateUser(req, res) {
  const user = await userRepository.get(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  await userRepository.set(user.username, { ...user, ...req.body });
  return res.status(204).send();
}
updateUser.options = {
  schema: {
    body: {
      type: "object",
      properties: {
        password: passwordSchema,
        role: roleSchema,
      },
      required: ["password"],
    },
    params: {
      type: "object",
      properties: {
        id: usernameSchema,
      },
    },
  },
};
