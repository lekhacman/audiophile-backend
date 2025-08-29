import userRepository from "./userRepository.js";

export default async function removeUser(req, res) {
  await userRepository.remove(req.params.id);
  return res.status(204).send();
}
