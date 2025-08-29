import userRepository from "./userRepository.js";

export default function listUser(req, res) {
  return userRepository.list().then(res.send.bind(res));
}
