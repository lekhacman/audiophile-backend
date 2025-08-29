import { path } from "ramda";
import * as fileRepository from "./fileRepository.js";
import AssetId from "./AssetId.js";
import assetRepository from "./assetRepository.js";

export default async function getAsset(req, res) {
  const assetId = new AssetId(req.user.username, req.params.id);

  /** @type Asset */
  const asset = await assetRepository.get(assetId.toString());
  if (!asset) {
    return res.status(404).send();
  }

  const { size } = await fileRepository.stat(assetId);
  const range = req.range(size);
  if (!range) {
    return res.status(416).send();
  }

  const start = path([0, "start"], range.ranges);
  const end = Math.min(start + 1e6, size - 1);

  res.header("Accept-Ranges", "bytes");
  res.header("Content-Ranges", `bytes ${start}-${end}/${size}`);
  res.header("Content-Length", end - start + 1);
  res.type(asset.mimeType);

  return res
    .status(206)
    .send(fileRepository.readStream(assetId, { start, end }));
}
