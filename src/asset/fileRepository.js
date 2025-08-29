import { STORAGE_PATH } from "../config.js";
import { createReadStream, createWriteStream } from "node:fs";
import fs from "fs/promises";

/**
 * @param {string} userId
 * @param {string} fileId
 * @return {Promise<ReadStream>}
 */
export function get(userId, fileId) {
  return Promise.resolve(
    createReadStream(`${STORAGE_PATH}/${userId}/${fileId}`),
  );
}

/**
 * @param {string} userId
 * @param {string} fileId
 * @param {ReadStream} file
 * @return {Promise<void>}
 */
export async function set(userId, { fileId, file }) {
  await fs.mkdir(`${STORAGE_PATH}/${userId}/${fileId}`, { recursive: true });
  file.pipe(createWriteStream(`${STORAGE_PATH}/${userId}/${fileId}`));
}
