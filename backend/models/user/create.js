const User = require("../schema/").User;


async function createUser({
  email,
  firstName,
  lastName,
  password,
  portfolio,
  wallet
}) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email });

    if (user) reject("Email is already in use");
    
    resolve(
      await User.create({
        email,
        firstName,
        lastName,
        email,
        password,
        portfolio,
        wallet
      })
    );
  })
}


module.exports = {
  createUser
}