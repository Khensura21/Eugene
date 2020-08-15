const mongoose = require("mongoose");


const DEFAULT_BALANCE = 500000 // $5000.00

const WalletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: DEFAULT_BALANCE
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Wallet = mongoose.model("Wallet", WalletSchema);


module.exports = Wallet;