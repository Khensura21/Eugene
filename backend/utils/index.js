const axios = require("axios"),
      date = require("date-and-time");

const AV_API_BASE_URL = "https://www.alphavantage.co/query?";


function buildAlphaVantageQuery(queryParameters) {
  let queryURL = AV_API_BASE_URL;

  for (const [parameter, argument] of Object.entries(queryParameters)) {
    queryURL += `${parameter}=${argument}&`
  }

  return queryURL.substr(0, queryURL.length - 1);
}

function getIntradaySettingsAsJSON() {
  return {
    function: "TIME_SERIES_INTRADAY",
    interval: "1min"
  }
}

function getDailySettingsAsJSON() {
  return {
    function: "TIME_SERIES_DAILY"
  }
}

let mapToAlphaConfig = {
  "current": getIntradaySettingsAsJSON,
  "open": getDailySettingsAsJSON
}

function mapQueryToAlphaVantageAPI(query) {
  let mappedQuery = Object.assign(
    {},
    query,
    mapToAlphaConfig[query.when]()
  );
  mappedQuery.apikey = process.env.ALPHA_VANTAGE_API_KEY;
  delete mappedQuery.when; // error prone, I presume, if the api changes
  
  return mappedQuery;
}
//start
//pay attention to this function. deeply understand it 
async function extractPrice(queryParameters, index) {
  const stockInfoRequest = buildAlphaVantageQuery(queryParameters);
  const response = await axios.get(stockInfoRequest);
  const stockData = response.data; // check if axios status code is good
  const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];
  const mostRecentPrice = stockData[index][lastRefreshed];
  return mostRecentPrice;
}

function extractTimeSeriesDaily(query) {
  let avFuncWords = query.function.split("_");
  let avFunction = titleCase(
    avFuncWords.join(" ")
  );
  avFuncWords = avFunction.split(" ");
  avFuncWords[avFuncWords.length - 1] = `(${avFuncWords[avFuncWords.length - 1]})`;
  
  return avFuncWords.join(" ");
}

function extractTimeSeriesIntraDay(query) {
  let avFuncWords = query.function.split("_");
  avFuncWords = avFuncWords.slice(0, avFuncWords.length - 1);
  let avFunction = titleCase(
    avFuncWords.join(" ")
  );
  avFunction = `${avFunction} (${query.interval})`;

  return avFunction;
}

function extractIndexAsString(query) {
  // map to other extractors
  indexExtractors = {
    "TIME_SERIES_DAILY": extractTimeSeriesDaily,
    "TIME_SERIES_INTRADAY": extractTimeSeriesIntraDay
  }
  return indexExtractors[query.function](query);
}

function getTodayAsString() {
  const pattern = date.compile("YYYY-MM-DD");
  let date = new Date;
  return date.format(new Date, pattern);
}

function titleCase(str) {
  let sentence = str.toLowerCase().split(" ");

  return sentence
    .map(word => word.substr(0, 1).toUpperCase() + word.substring(1))
    .join(" ")
}


module.exports = {
  buildAlphaVantageQuery,
  extractPrice,
  extractIndexAsString,
  getTodayAsString,
  mapQueryToAlphaVantageAPI,
  titleCase,
}