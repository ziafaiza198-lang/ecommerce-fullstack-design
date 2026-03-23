const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// POST email
router.post("/", async (req, res) => {
  try {
    const newSub = new Subscriber({ email: req.body.email });
    await newSub.save();
    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all subscribers (optional check)
router.get("/", async (req, res) => {
  const data = await Subscriber.find();
  res.json(data);
});

module.exports = router;
