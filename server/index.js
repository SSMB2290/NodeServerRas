const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://root:bharathMongoDB@cluster-1.n5rhi.mongodb.net/event_bot", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  teckziteId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
  const { teckziteId, password } = req.body;
  
  console.log(password);
  // Validate input
  if (!teckziteId || !password) {
    return res.status(400).json({ message: 'Teckzite ID and password are required' });
  }

  // Check if user exists
  const user = await User.findOne({ teckzite_id:teckziteId,password:password});
  console.log("The user details are:"+user);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user._id, teckzite_id: user.teckzite_id, name: user.name },
    "abcd",
    { expiresIn: '1h' }  // Token expires in 1 hour (you can adjust this as needed)
  );
  res.json({ message: 'Login successful', token });
});

app.post("/get-user-details", async (req, res) => {
  try {
      const { teckzite_id } = req.body; // Expect email from the frontend
      const user = await User.findOne({ teckzite_id:teckzite_id });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user); // Send user details to frontend
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
