const Wallet = require("../schema").Wallet;


async function createWallet({
  user_id
}) {
  return new Promise(async (resolve, reject) => {
    const wallet = await Wallet.findOne({ user_id })

    if (wallet) reject("Wallet already exist");

    resolve(
      await Wallet.create({ user_id })
    );
  });
}


module.exports = {
  createWallet
}