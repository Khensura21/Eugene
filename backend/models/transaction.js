const mongoose = require("mongoose");


const TransactionSchema = new mongoose.Schema({
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Stock"
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;