import { STORAGE_PATH } from "../config.js";
import fs from "fs/promises";
import { createReadStream } from "node:fs";

export default async function getAsset(req, res) {
  const path = `${STORAGE_PATH}/space-Oddity.mp3`;
  const { size } = await fs.stat(path);
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
