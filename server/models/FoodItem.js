const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("FoodItem", FoodItemSchema);
