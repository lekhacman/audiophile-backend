import db, { createRepository } from "../client/db.js";
import AssetId from "./AssetId.js";
import { evolve, map, mergeAll, pipe, splitEvery, toString } from "ramda";

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

const constructAssetMetadata = pipe(
  splitEvery(2),
  map(pipe(evolve({ 0: AssetId.from, 1: JSON.parse }), mergeAll)),
);

/**
 * @param ownerId
 * @return {Promise<Array<Asset>>}
 */
assetRepository.findAllByOwnerId = async function findAllByOwnerId(ownerId) {
  return db
    .hscanStream(id, { match: AssetId.of({ ownerId }).toString() })
    .flatMap(constructAssetMetadata)
    .toArray();
};
assetRepository.removeAssets = function removeAssets(ownerId) {
  return assetRepository
    .findAllByOwnerId(ownerId)
    .then(map(pipe(AssetId.of, toString, assetRepository.remove)))
    .then((a) => Promise.all(a));
};

export default assetRepository;
