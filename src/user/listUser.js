import userRepository from "./userRepository.js";
import { roleSchema, usernameSchema } from "./userSchema.js";
import { map, pick } from "ramda";

export default function listUser(req, res) {
  return userRepository
    .list()
    .then(map(pick(["username", "role"])))
    .then(res.send.bind(res));
}
listUser.options = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            username: usernameSchema,
            role: roleSchema,
          },
        },
      },
    },
  },
};
