const express = require('express');
const router = express.Router();
const Room = require('../schema/Rooms'); 
const User = require('../schema/User');

// Create a new room
router.post('/create-room', async (req, res) => {
  const { name, description, isPrivate, createdBy } = req.body;

  try {
    const newRoom = new Room({
      name,
      description,
      isPrivate: isPrivate || false,
      createdBy, // Admin of the room
      users: [createdBy], // Add the admin as the first user in the room
    });

    await newRoom.save();
    res.status(201).json({ success: true, message: 'Room created successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating room', error: error.message });
  }
});

// Get details of a room
router.get('/room/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId)
      .populate('createdBy', 'name email') // Fetch only name and email of the admin
      .populate('users', 'name email'); // Fetch name and email of all users in the room

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching room', error: error.message });
  }
});

// Add a new user to a room
router.post('/room/:roomId/add-user', async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (room.users.includes(userId)) {
      return res.status(400).json({ success: false, message: 'User is already in the room' });
    }

    room.users.push(userId);
    await room.save();

    res.status(200).json({ success: true, message: 'User added to the room successfully', room });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding user to the room', error: error.message });
  }
});

// Remove a user from a room
router.delete('/room/:roomId/remove-user', async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req.body;
  
    try {
      // Find the room
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      // Check if the user is in the room
      if (!room.users.includes(userId)) {
        return res.status(400).json({ success: false, message: 'User is not in the room' });
      }
  
      // Remove the user from the room
      room.users = room.users.filter(user => user.toString() !== userId);
      await room.save();
  
      res.status(200).json({ success: true, message: 'User removed from the room successfully', room });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing user from the room', error: error.message });
    }
  });

  // Fetch all rooms
router.get('/rooms', async (req, res) => {
    try {
      // Fetch all rooms and optionally populate the createdBy field with user details (e.g., name and email)
      const rooms = await Room.find().populate('createdBy', 'name email');
  
      res.status(200).json({
        success: true,
        message: 'Rooms fetched successfully',
        rooms,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching rooms',
        error: error.message,
      });
    }
  });

  // Fetch a room by name
router.get('/room/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find the room by name (case-insensitive)
      const room = await Room.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
        .populate('createdBy', 'name email') // Optionally fetch admin details
        .populate('users', 'name email') // Optionally fetch user details
        .populate('messages'); // Populate messages if needed
  
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Room fetched successfully',
        room,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching room',
        error: error.message,
      });
    }
  });

  
  // Fetch all rooms a user is part of
router.get('/rooms/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all rooms where the user is part of the room's users array
    const rooms = await Room.find({ users: userId })
      .populate('createdBy', 'name email') // Fetch only name and email of the admin
      .populate('users', 'name email'); // Fetch name and email of all users in the room

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No rooms found for this user',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rooms fetched successfully',
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms for the user',
      error: error.message,
    });
  }
});
  
  
  

// Export the router
module.exports = router;
