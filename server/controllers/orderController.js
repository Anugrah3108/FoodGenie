const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "name email")
        .populate("items.foodItem", "name price category")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: req.user.id })
        .populate("items.foodItem", "name price category")
        .sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.foodItem", "name price category imageUrl");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role !== "admin" && String(order.user._id) !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, address } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      items,
      totalPrice,
      address,
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role !== "admin" && String(order.user) !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await order.deleteOne();
    res.json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
