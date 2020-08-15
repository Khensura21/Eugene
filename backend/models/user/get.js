const User = require("../schema/").User;


async function getUserById(id) {
  return await User.findById(id).exec();
}

async function getUserByEmail(email) {
  return await User.findOne({ email }).exec();
}


module.exports = {
  getUserById,
  getUserByEmail
}