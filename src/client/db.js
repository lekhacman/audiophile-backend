import Redis from "ioredis";
import { REDIS_HOST } from "../config.js";
import { map } from "ramda";

const db = new Redis(6379, REDIS_HOST);

/**
 * @param {{id: string}} options
 * @returns {Repository}
 */
export function createRepository(options) {
  const key = options.id;
  /**
   * @typedef {function} GetDoc
   * @param {string} id
   * @return {Promise<object>}
   */
  function get(id) {
    return db.hget(key, id).then(JSON.parse);
  }

  /**
   * @typedef {function} ExistDoc
   * @param {string} id
   * @return {Promise<boolean>}
   */
  function exist(id) {
    return db.hexists(key, id);
  }
  /**
   * @typedef {function} ListDoc
   * @return {Promise<Array>}
   */
  function list() {
    return db.hvals(key).then(map(JSON.parse));
  }
  /**
   * @typedef {function} SetDoc
   * @param {string} id
   * @param {string} dto
   * @return {Promise<void>}
   */
  function set(id, dto) {
    return db.hset(key, id, JSON.stringify(dto));
  }
  /**
   * @typedef {function} RemoveDoc
   * @param {string} id
   * @return {Promise<void>}
   */
  function remove(id) {
    return db.hdel(key, id);
  }

  /**
   * @typedef {function} Size
   * @return {Promise<number>}
   */
  function size() {
    return db.hlen(key);
  }

  /**
   * @return {Promise<Array<string>>}
   */
  function ids() {
    return db.hkeys(key);
  }

  /**
   * @typedef {function} Expire
   * @param {string} id
   * @param {number} seconds
   * @return {Promise<void>}
   */
  function expire(id, seconds) {
    return db.hexpire(key, seconds, "FIELDS", 1, id);
  }

  /**
   * @typedef {object} Repository
   * @property {GetDoc} get
   * @property {ExistDoc} exist
   * @property {ListDoc} list
   * @property {SetDoc} set
   * @property {RemoveDoc} remove
   * @property {Size} size
   * @property {Expire} expire
   */
  return { get, set, list, remove, exist, size, ids, expire };
}

export default db;
