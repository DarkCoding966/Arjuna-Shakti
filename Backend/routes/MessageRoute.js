// Import required models
const express = require('express');
const router = express.Router();
const Message = require('../schema/Messages');
const User = require('../schema/User');
const Room = require('../schema/Rooms');

// Route to send a message
router.post('/send-message', async (req, res) => {
  const { content, senderId, roomId } = req.body; // Expecting message content, sender's ID, and room ID in the body

  try {
    // Ensure the user and room exist
    const user = await User.findById(senderId);
    const room = await Room.findById(roomId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Create the new message
    const newMessage = new Message({
      content,
      sender: senderId,  // Link to sender (user)
      room: roomId,      // Link to room
    });

    // Save the message
    await newMessage.save();

    // Add the message to the room's messages list (optional, but recommended for quick lookup)
    room.messages.push(newMessage._id);
    await room.save();

    // Respond with success
    res.status(201).json({ success: true, message: 'Message sent successfully', message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
});

// Route to delete a message
router.delete('/delete-message/:messageId', async (req, res) => {
  const { messageId } = req.params;
  const { userId } = req.body; // UserId from the body for authorization check

  try { 
    // Find the message
    const message = await Message.findById(messageId).populate('room sender');

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    // Check if the user is the sender or the room's creator (admin) to authorize the delete operation
    if (message.sender._id.toString() !== userId && message.room.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this message' });
    }

    // Remove the message from the room's messages array
    await Room.updateOne(
      { _id: message.room._id },
      { $pull: { messages: messageId } }
    );

    // Delete the message from the database
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting message', error: error.message });
  }
});

// Route to get all messages of a room
router.get('/get-messages/:roomId', async (req, res) => {
  const { roomId } = req.params; // Room ID from the URL parameter

  try {
    // Find the room and populate the messages
    const room = await Room.findById(roomId).populate({
      path: 'messages',
      populate: { path: 'sender', select: 'name email' } // Populate sender details like name and email
    });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // Return all the messages associated with the room
    res.status(200).json({ success: true, messages: room.messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching messages', error: error.message });
  }
});


module.exports = router;
