const  express = require ("express");
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes.js"); // Fixed capitalization in path
const cors = require("cors")
const authRoutes = require("./routes/auth.js");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json()); // ✅ Middleware for JSON data
app.use(cors())

// MongoDB connection with environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
  });

app.get("/", (req,res)=>{
  res.send("this route is working")
})
app.use("/blogs", blogRoutes); 
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
