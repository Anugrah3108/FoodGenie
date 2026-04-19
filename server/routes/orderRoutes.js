const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.route("/").get(auth, getOrders).post(auth, createOrder);

router
  .route("/:id")
  .get(auth, getOrder)
  .put(auth, admin, updateOrderStatus)
  .delete(auth, deleteOrder);

module.exports = router;
