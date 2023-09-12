if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3100
const cors = require('cors')
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { Server } = require('socket.io')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', router)
app.use(errorHandler)
app.use('/images', express.static('images'));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  })
})





