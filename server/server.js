const express = require("express");
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes.js");
const cors = require("cors")
const authRoutes = require("./routes/auth.js");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(cors())

// MongoDB connection with improved configuration
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
    console.log('Attempting to connect to MongoDB with URI:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.get("/", (req, res) => {
  res.send("this route is working")
})

app.use("/blogs", blogRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
