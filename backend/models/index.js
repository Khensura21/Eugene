const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/eugene', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = Promise; //allows us to use the promise syntax

module.exports.User = require("./user");
module.exports.Wallet = require("./wallet");
module.exports.Stock = require("./stock");
module.exports.Portfolio = require("./portfolio");