const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const FoodItem = require("./models/FoodItem");
const User = require("./models/User");
const Order = require("./models/Order");

const seedData = [
  {
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheddar cheese, lettuce, and tomato.",
    price: 9.99,
    category: "Burger",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    available: true,
  },
  {
    name: "Margherita Pizza",
    description:
      "Wood-fired pizza with tomato sauce, fresh mozzarella, and basil.",
    price: 14.5,
    category: "Pizza",
    imageUrl:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&q=80",
    available: true,
  },
  {
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing.",
    price: 8.5,
    category: "Salad",
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    available: true,
  },
  {
    name: "Grilled Salmon",
    description: "Salmon fillet seasoned and grilled, served with asparagus.",
    price: 18.0,
    category: "Seafood",
    imageUrl:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=500&q=80",
    available: true,
  },
  {
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
    price: 6.99,
    category: "Dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80",
    available: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/foodgenie",
    );
    console.log("Connected to MongoDB");

    await FoodItem.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing foods, users, and orders");

    const insertedFoods = await FoodItem.insertMany(seedData);
    console.log("Successfully seeded dummy food items!");

    // Seed Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@foodgenie.com",
      password: hashedPassword,
      role: "admin",
    });

    const standardUser = await User.create({
      name: "John Doe",
      email: "user@foodgenie.com",
      password: hashedPassword,
      role: "user",
    });
    console.log("Successfully seeded dummy users!");

    // Seed Orders
    await Order.create([
      {
        user: standardUser._id,
        items: [
          {
            foodItem: insertedFoods[0]._id, // Cheeseburger
            quantity: 2,
            unitPrice: insertedFoods[0].price,
          },
          {
            foodItem: insertedFoods[2]._id, // Caesar Salad
            quantity: 1,
            unitPrice: insertedFoods[2].price,
          },
        ],
        totalPrice: insertedFoods[0].price * 2 + insertedFoods[2].price,
        status: "delivered",
        address: "123 Main St, New York, NY",
      },
      {
        user: standardUser._id,
        items: [
          {
            foodItem: insertedFoods[1]._id, // Pizza
            quantity: 1,
            unitPrice: insertedFoods[1].price,
          },
        ],
        totalPrice: insertedFoods[1].price,
        status: "pending",
        address: "123 Main St, New York, NY",
      },
    ]);
    console.log("Successfully seeded dummy orders!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  }
};

seedDB();
