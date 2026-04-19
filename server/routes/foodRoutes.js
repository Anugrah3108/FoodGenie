const express = require("express");
const router = express.Router();
const {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.route("/").get(getFoods).post(auth, admin, createFood);

router
  .route("/:id")
  .get(getFood)
  .put(auth, admin, updateFood)
  .delete(auth, admin, deleteFood);

module.exports = router;
