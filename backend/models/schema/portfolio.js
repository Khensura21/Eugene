const mongoose = require("mongoose");


const PortfolioSchema = new mongoose.Schema({
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        default: []
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        default: []
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;