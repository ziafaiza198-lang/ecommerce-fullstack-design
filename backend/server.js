const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const subscriberRoutes = require("./routes/subscriberRoutes");

// middleware
app.use(cors());
app.use(express.json());

// static images
app.use("/images", express.static("public/images"));

// routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribers", subscriberRoutes);


// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));