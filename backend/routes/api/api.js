const { response } = require("../app");

const axios = require("axios"),
      date = require("date-and-time"),
      router = require("express").Router();


const AV_API_BASE_URL = "https://www.alphavantage.co/query?";

// extract to utility folder
function buildAlphaVantageQuery({ aVFunction, symbol }) {
  return `${AV_API_BASE_URL}function=${aVFunction}&symbol=${symbol}&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
}

function buildTimeSeriesIntraDayQuery({ symbol }) {
  return `${AV_API_BASE_URL}function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=compact&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;
}

async function extractCurrentPrice({ symbol }) {
  const stockInfoRequest = buildTimeSeriesIntraDayQuery({ symbol });
  const response = await axios.get(stockInfoRequest);
  const stockData = response.data; // error can happen here
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];
  const mostRecentPrice = stockData["Time Series (1min)"][lastRefreshed] // dependent upon interval -- fix this -- make modular
  return mostRecentPrice;
}

// Client makes a request to buy --> backend responds by querying API for stock info if request is valid
// --> if request is valid, we find the current user in our database and update their account
// with the info they requested by querying API to get it's price
router.get("/stockinfo", async (req, res) => {
  const mostRecentPrice = await extractCurrentPrice(req.query); // add some validation here `Error Message`
  res.json({ mostRecentPrice });
})



module.exports = router;