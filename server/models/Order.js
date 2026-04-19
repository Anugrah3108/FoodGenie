const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    address: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
