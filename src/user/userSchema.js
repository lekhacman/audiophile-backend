export const passwordSchema = { type: "string" };
const userSchema = {
  type: "object",
  properties: {
    username: { type: "string", pattern: "^[a-zA-Z0-9_-]+$" },
    password: passwordSchema,
  },
  required: ["username", "password"],
};
export default userSchema;
