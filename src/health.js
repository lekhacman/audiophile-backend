import userRepository from "./user/userRepository.js";
import fs from "fs";
import { promisify } from "util";
import { STORAGE_PATH } from "./config.js";

const exists = promisify(fs.exists);

export default async function health(req, res) {
  const pristine = await userRepository.isEmpty();
  const doestStorageFolderExist = await exists(STORAGE_PATH);
  return res.send({ msg: doestStorageFolderExist ? "Up" : "Down", pristine });
}
