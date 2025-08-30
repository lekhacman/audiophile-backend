import { STORAGE_PATH } from "../config.js";
import { createReadStream, createWriteStream } from "node:fs";
import fs from "fs/promises";

/**
 * @param {AssetId} assetId
 * @param {{start: number, end: number}} options
 * @return {ReadStream}
 */
export function readStream(assetId, options) {
  return createReadStream(assetId.toPath(), options);
}

export function stat(assetId) {
  return fs.stat(assetId.toPath());
}

/**
 * @param {AssetId} assetId
 * @param {ReadStream} file
 * @return {Promise<void>}
 */
export async function set(assetId, file) {
  await fs.mkdir(`${STORAGE_PATH}/${assetId.ownerId}`, { recursive: true });
  file.pipe(createWriteStream(assetId.toPath()));
}

export function remove(ownerId) {
  return fs.rm(`${STORAGE_PATH}/${ownerId}`, { recursive: true, force: true });
}
