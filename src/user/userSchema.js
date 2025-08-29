import { USER_ROLE } from "./userRepository.js";

export const passwordSchema = { type: "string", minLength: 1, maxLength: 128 };
const userSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: "^[a-zA-Z0-9_-]+$",
      minLength: 1,
      maxLength: 32,
    },
    password: passwordSchema,
    role: {
      type: "string",
      pattern: `^(${Object.values(USER_ROLE).join("|")})$`,
    },
  },
  required: ["username", "password"],
};
export default userSchema;
