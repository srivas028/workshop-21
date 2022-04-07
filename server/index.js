const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-app");

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
