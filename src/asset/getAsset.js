import fs from "fs/promises";
import { createReadStream } from "node:fs";
import * as fileRepository from "./fileRepository";
import AssetId from "./AssetId.js";

export default async function getAsset(req, res) {
  const assetId = new AssetId(req.user.username, req.params.id);
  const { size } = await fileRepository.stat(assetId);
  const range = req.range(size);
  if (!range) {
    const err = new Error("Invalid range");
    err.statusCode = 416;
    throw err;
  }
  const [firstRange] = range.ranges;
  const { start } = firstRange;
  const end = Math.min(start + 1e6, size - 1);
  res.header("Accept-Ranges", "bytes");
  res.header("Content-Ranges", `bytes ${start}-${end}/${size}`);
  res.header("Content-Length", end - start + 1);
  res.type("audio/mpeg");
  res.statusCode = 206;
  const stream = createReadStream(path, { start, end });
  return res.send(stream);
}
