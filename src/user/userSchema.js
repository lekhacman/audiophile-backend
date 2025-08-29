const userSchema = {
  type: "object",
  properties: {
    username: { type: "string", pattern: "^[a-zA-Z0-9_-]+$" },
    password: { type: "string" },
  },
  required: ["username", "password"],
};
export default userSchema;
