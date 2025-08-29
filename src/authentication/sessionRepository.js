import { createRepository } from "../client/db.js";

/**
 * @typedef {object} UserSession
 * @property {string} username
 * @property {string} role
 */

/**
 * @readonly
 * @enum {string}
 */
export const KEY = {
  SESSION_ID: "JSESSIONID",
};

const secondaryIndex = createRepository({ id: "sessionIdByUsername" });

const sessionRepository = createRepository({ id: "session" });
sessionRepository.set = function setSession(id, user) {
  return Promise.all([
    sessionRepository.set(id, user),
    secondaryIndex.set(user.username, id),
  ]);
};
/**
 * @type {function}
 * @param {string} username
 * @return {Promise<UserSession>}
 */
sessionRepository.getSessionIdByUsername = secondaryIndex.get;
export default sessionRepository;
