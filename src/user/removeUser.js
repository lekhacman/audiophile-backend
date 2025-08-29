import userRepository from "./userRepository.js";
import { usernameSchema } from "./userSchema.js";

export default async function removeUser(req, res) {
  if (req.user.username === req.params.fileId) {
    return res.status(403).send();
  }
  await userRepository.remove(req.params.fileId);
  return res.status(204).send();
}
removeUser.options = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: usernameSchema,
      },
    },
  },
};
