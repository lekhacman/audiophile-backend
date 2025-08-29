import assetRepository from "./assetRepository.js";

export default function listAsset(req, res) {
  return assetRepository
    .findAllByOwnerId(req.user.username)
    .then(res.send.bind(res));
}
