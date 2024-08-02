const User = require("../models/user");

async function getAllUsers(req, res) {
  const users = await User.find({});
  return res.send(users);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");
  return res.json(user);
}

async function createUser(req, res) {
  const user = req.body;

  if (
    !user ||
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.gender ||
    !user.jobTitle
  ) {
    return res.status(400).send("Please provide all required fields");
  }

  const newUser = new User(user);

  await newUser.save();
  return res.send(`User with id ${newUser.id} created successfully`);
}

async function updateUserById(req, res) {
  const id = req.params.id;
  const userChanges = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");

  await User.findByIdAndUpdate(id, {...userChanges});
  return res.send(`User with id ${id} updated successfully`);
}

async function deleteUserById(req, res) {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");

  await User.findByIdAndDelete(id);
  return res.send(`User with id ${id} deleted successfully`);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
