import assetRepository from "./assetRepository.js";
import * as fileRepository from "./fileRepository.js";
import AssetId from "./AssetId.js";

export default async function uploadAsset(req, res) {
  /** @type MultipartFile */
  const data = await req.file();

  if (!data.mimetype.startsWith("audio/")) {
    return res.status(415).send("Only audio files are allowed");
  }

  const assetId = new AssetId(req.user.username, crypto.randomUUID());
  await Promise.all([
    assetRepository.set(assetId, {
      name: data.filename,
      mimeType: data.mimetype,
    }),
    fileRepository.set(assetId, data.file),
  ]);
  return res.status(201).send();
}
