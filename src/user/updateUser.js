import { passwordSchema } from "./userSchema.js";
import userRepository from "./userRepository.js";

export default async function updateUser(req, res) {
  const user = await userRepository.get(req.params.fileId);
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
      },
      required: ["password"],
    },
  },
};
