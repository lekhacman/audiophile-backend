import { createRepository } from "../client/db.js";
import { not } from "ramda";
import crypto from "crypto";
import { promisify } from "util";

const pbkdf2 = promisify(crypto.pbkdf2);
/**
 * @readonly
 * @enum {string}
 */
export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
};
/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} password
 * @property {string} salt
 * @property {USER_ROLE} role
 */

/**
 * @typedef {object} UserRepository
 * @property {() => Promise<boolean>} isEmpty
 *
 * @type {Repository & UserRepository}
 */
const userRepository = createRepository({ id: "user" });

userRepository.isEmpty = () => userRepository.size().then(not);

userRepository.set = async function set(id, user) {
  const saltInHex = crypto.randomBytes(16).toString('hex');
  const hashedInHex = await hash(user.password, saltInHex);
  return userRepository.set(id, {
    ...user,
    username: id,
    salt: saltInHex,
    password: hashedInHex,
  });
};

/**
 * @param {string} password
 * @param {string} saltInHex
 * @return {Promise<string>}
 */
export async function hash(password, saltInHex) {
  const hashed = await pbkdf2(password, Buffer.from(saltInHex, 'hex'), 1e3, 64, "sha512");
  return hashed.toString("hex");
}

export default userRepository;
