import { USER_ROLE } from "./userRepository.js";

export const passwordSchema = { type: "string", minLength: 1, maxLength: 128 };
export const roleSchema = {
  type: "string",
  pattern: `^(${Object.values(USER_ROLE).join("|")})$`,
};
export const usernameSchema = {
  type: "string",
  pattern: "^[a-zA-Z0-9_-]+$",
  minLength: 1,
  maxLength: 32,
};
const userSchema = {
  type: "object",
  properties: {
    username: usernameSchema,
    password: passwordSchema,
    role: roleSchema,
  },
  required: ["username", "password"],
};
export default userSchema;
