const {
  extractPrice,
  extractIndexAsString,
  mapQueryToAlphaVantageAPI
} = require("../../utils/index");


async function stockOpenAPI(req, res) {
  let queryParams = mapQueryToAlphaVantageAPI({ ...req.query, when: "open" });
  
  let openPrice = await extractPrice(
    queryParams,
    extractIndexAsString(queryParams)
  );

  res.json({
    "open": openPrice["1. open"]
  });
};

async function stockCurrentAPI(req, res) {
  let queryParams = mapQueryToAlphaVantageAPI({ ...req.query, when: "current" });
  
  let currentPrice = await extractPrice(
    queryParams,
    extractIndexAsString(queryParams)
  )
  
  res.json({
    "current": currentPrice["1. open"]
  });
}


module.exports = {
  stockCurrentAPI,
  stockOpenAPI
};