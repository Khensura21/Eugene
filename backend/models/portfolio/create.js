const Portfolio = require("../schema").Portfolio;


async function createPortfolio({
  user_id
}) {
  return new Promise(async (resolve, reject) => {
    const portfolio = await Portfolio.findOne({ user_id });

    if (portfolio) reject("Portfolio already exists");

    resolve(
      await Portfolio.create({ user_id })
    );
  });
}


module.exports = {
  createPortfolio
}