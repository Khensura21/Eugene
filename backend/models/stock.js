const mongoose = require("mongoose");


const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: String
  },
  name: {
    type: String,
    required: String
  }
});

const Stock = mongoose.model("Stock", StockSchema);


module.exports = Stock;