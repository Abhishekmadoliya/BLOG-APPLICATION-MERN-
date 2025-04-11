
const express = require("express");
const router = express.Router(); // ✅ Create router instance
const blog = require("../modal/blog");
const Blog = require("../modal/blog");

const User = require("../modal/user");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  res.status(200).json({ message: "Login successful" });


}); 

module.exports = router;
