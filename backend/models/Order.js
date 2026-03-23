const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
    }
  ],
  total: Number,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
