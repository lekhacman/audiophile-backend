import db, { createRepository } from "../client/db.js";
import AssetId from "./AssetId.js";
import {
  always,
  evolve,
  head,
  identity,
  ifElse,
  length,
  mergeAll,
  not,
  pick,
  pipe,
} from "ramda";

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

const returnEmptyArrayIfOwnerHasEmptyAsset = ifElse(
  pipe(head, Object.keys, length, not),
  always([]),
  identity,
);

const constructAssetMetadata = pipe(
  evolve({ 0: pipe(AssetId.from, pick(["fileId"])), 1: JSON.parse }),
  mergeAll,
);

/**
 * @param ownerId
 * @return {Promise<Array<Asset>>}
 */
assetRepository.findAllByOwnerId = async function findAllByOwnerId(ownerId) {
  return db
    .hscanStream(id, { match: AssetId.of({ ownerId, fileId: "*" }).toString() })
    .map(constructAssetMetadata)
    .toArray()
    .then(returnEmptyArrayIfOwnerHasEmptyAsset);
};

export default assetRepository;
