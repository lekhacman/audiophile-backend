import userRepository from "./userRepository.js";

export default async function removeUser(req, res) {
  if (req.user.username === req.params.fileId) {
    return res.status(403).send();
  }
  await userRepository.remove(req.params.fileId);
  return res.status(204).send();
}
