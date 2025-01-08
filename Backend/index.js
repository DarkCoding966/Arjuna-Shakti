require('dotenv').config();
const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoute.js');
const roomRoutes = require('./routes/RoomRoute.js');
const messageRoutes = require('./routes/MessageRoute.js');

connectToMongo();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);       
app.use('/api/rooms', roomRoutes);       
app.use('/api/messages', messageRoutes); 

// Start server
app.listen(port, () => {
  console.log(`Shakti backend listening at https://localhost:${port}`);
});
