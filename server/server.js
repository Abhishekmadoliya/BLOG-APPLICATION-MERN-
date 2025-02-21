const  express = require ("express");
const mongoose = require("mongoose")
const blogRoutes = require ("./routes/blogroutes.js"); // ✅ Ensure correct path
const cors = require("cors")

const app = express();

app.use(express.json()); // ✅ Middleware for JSON data
app.use(cors())




mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
  console.log("DB connected");
  
}).catch((err)=>{
  console.log("some problem in db", err);
  
})
app.get("/", (req,res)=>{
  res.send("this route is working")
})
app.use("/blogs", blogRoutes); // ✅ Correctly use routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
