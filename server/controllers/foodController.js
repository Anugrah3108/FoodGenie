const FoodItem = require("../models/FoodItem");

exports.getFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFood = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFood = async (req, res) => {
  try {
    const newFood = new FoodItem(req.body);
    const food = await newFood.save();
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!food) return res.status(404).json({ message: "Food item not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await FoodItem.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food item not found" });
    res.json({ message: "Food item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
