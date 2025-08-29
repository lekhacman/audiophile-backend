import db, { createRepository } from "../client/db.js";
import AssetId from "./AssetId.js";
import { evolve, mergeAll, pick, pipe } from "ramda";

/**
 * @typedef {object} Asset
 * @property {string} name
 * @property {string} mimeType
 */

const id = "asset";
const { set, ...assetRepository } = createRepository({ id });

/**
 * @param {AssetId} assetId
 * @param {Asset} asset
 * @return {Promise<void>}
 */
assetRepository.set = function setAsset(assetId, asset) {
  return set(assetId.toString(), asset);
};

/**
 * @param ownerId
 * @return {Promise<Array<Asset>>}
 */
assetRepository.findAllByOwnerId = async function findAllByOwnerId(ownerId) {
  return db
    .hscanStream(id, { match: AssetId.of({ ownerId, fileId: "*" }).toString() })
    .map(
      pipe(
        evolve({ 0: pipe(AssetId.from, pick(["fileId"])), 1: JSON.parse }),
        mergeAll,
      ),
    )
    .toArray();
};

export default assetRepository;
