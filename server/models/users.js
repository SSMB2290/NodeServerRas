const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    teckzite_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registered_events: { type: [String], default: [] },  // Array of event IDs or names
    password: { type: String, required: true },
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` fields
);

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
