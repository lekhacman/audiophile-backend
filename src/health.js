import userRepository from "./user/userRepository.js";

export default async function health(req, res) {
  const pristine = await userRepository.isEmpty;
  return res.send({ msg: "Up", pristine });
}
