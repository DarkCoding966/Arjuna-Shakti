const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/User'); 
const Room = require('../schema/Rooms'); 

const router = express.Router();

// JWT Secret key (you should store it securely)
const JWT_SECRET = 'Shakti_User_Dominance';

// Create a new user
router.post('/create', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
});

// Login user and return authToken (JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create JWT token
    const authToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: 'Login successful', authToken });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
});

// Fetch a user (for authenticated users)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('rooms'); // Populating the rooms if needed
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
});

// Delete a room for a user
router.delete('/room/:roomId', async (req, res) => {
  const { userId } = req.body;  // Assuming userId is provided in the request body (or JWT decoded info)
  const { roomId } = req.params;

  try {
    // Find the room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Check if the user is the creator (admin) of the room
    if (room.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'You are not the creator of this room' });
    }

    // Remove the room from the user's rooms list
    const user = await User.findById(userId);
    user.rooms.pull(roomId);
    await user.save();

    // Delete the room
    await room.remove();

    res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting room', error: error.message });
  }
});

// Route to let a user leave a room they have joined (but are not the creator)
router.post('/leave-room', async (req, res) => {
    const { userId, roomId } = req.body; // Assuming userId and roomId are passed in the request body
  
    try {
      // Find the room by ID
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      // Check if the user is part of the room (not the creator)
      if (!room.users.includes(userId)) {
        return res.status(400).json({ success: false, message: 'User is not part of this room' });
      }
  
      if (room.createdBy.toString() === userId) {
        return res.status(400).json({ success: false, message: 'Creator cannot leave the room' });
      }
  
      // Remove the user from the room's users array
      room.users.pull(userId);
      await room.save();
  
      // Remove the room from the user's rooms list
      const user = await User.findById(userId);
      user.rooms.pull(roomId);
      await user.save();
  
      res.status(200).json({ success: true, message: 'User has left the room successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing user from room', error: error.message });
    }
  });

  

module.exports = router;
