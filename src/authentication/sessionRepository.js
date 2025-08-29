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

const { set, expire, ...sessionRepository } = createRepository({
  id: "session",
});

sessionRepository.set = function setSession(id, user) {
  return Promise.all([set(id, user), secondaryIndex.set(user.username, id)]);
};

sessionRepository.expire = function expireSession(id, username, seconds) {
  return Promise.all([expire(id, seconds), secondaryIndex.expire(username, seconds)]);
};

/**
 * @type {function}
 * @param {string} username
 * @return {Promise<UserSession>}
 */
sessionRepository.getSessionIdByUsername = secondaryIndex.get;

export default sessionRepository;
