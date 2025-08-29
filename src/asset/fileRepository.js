import { STORAGE_PATH } from "../config.js";
import { createReadStream, createWriteStream } from "node:fs";
import fs from "fs/promises";

/**
 * @param {AssetId} assetId
 * @return {Promise<ReadStream>}
 */
export function get(assetId) {
  return Promise.resolve(createReadStream(assetId.toPath()));
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
  const { ownerId, fileId } = assetId;
  await fs.mkdir(`${STORAGE_PATH}/${ownerId}`, { recursive: true });
  file.pipe(createWriteStream(`${STORAGE_PATH}/${ownerId}/${fileId}`));
}
