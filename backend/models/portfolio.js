const mongoose = require("mongoose");


const PortfolioSchema = new mongoose.Schema({
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    user: {

    }
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;