require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

// Optional health check route
app.get('/', (req, res) => {
  res.send('✅ Mental Health Backend is running. Use /api/* routes.');
});


// Socket.io basic connection for chat
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('join', (room) => socket.join(room));
  socket.on('message', (msg) => {
    // echo to room
    io.to(msg.room).emit('message', msg);
  });
});

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mental_health';

mongoose.connect(MONGO, { })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch((err)=> {
    console.error('Mongo connection error', err);
  });
