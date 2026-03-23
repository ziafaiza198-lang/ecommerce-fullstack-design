const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Product model


// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // MongoDB se saare products fetch
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all products
router.delete("/", async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post("/", async (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  const newProduct = new Product({ name, price, image, description, category, stock });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
