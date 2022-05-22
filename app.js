const mongo = require('mongodb').MongoClient
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const e = require('cors')
app.use(cors())
const { v4: uuidv4 } = require('uuid')

/* Env variables */
const MONGO_URL = 'mongodb+srv://pokerplanner:pokerplanner2022@pokerplanner.wahup.mongodb.net/?retryWrites=true&w=majority'
const CLIENT_URL = 'http://localhost:3002'
const SERVER_PORT = 4000

/* Creating an express Server and then integrating it with Socketio */
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

/* Establishing db connection and performing all user interactions within the callback */
mongo.connect(MONGO_URL, function (err, client) {
  if (err) {
    console.log('MongoDB connection failed with error: ', err)
    throw err
  }
  console.log('MongoDB connection successful')
  io.on('connection', socket => {
    var db = client.db('pokerplanner')
    let sprint = db.collection('sprints')
    let user = db.collection('users')

    socket.on('CREATE__SPRINT', data => {
      const ID = uuidv4()
      const name = data.sprintName
      const username = data.userName
      const isScrumMaster = 1
      sprint.insertOne({ sprintID: ID, sprintName: name, sprintMaster: username }, function () {
        user.insertOne({ sprintID: ID, userName: username, isScrumMaster: isScrumMaster }, async function () {
          user.find({ sprintID: ID }, { sprintID: 1, sprintName: 1, userName: 1, _id: 1 }).toArray(function (err, res) {
            socket.emit('SHOW_SPRINT', res)
          })
        })
      })
    })

    socket.on('JOIN__ROOM', roomId => {
      socket.join(roomId)
    })

    socket.on('CREATE_STORY', data => {
      console.log(data)
      socket.to(data.room).emit('STORIES', data)
    })
  })
})

server.listen(SERVER_PORT, () => {
  console.log('Server is running')
})

/* 
Creating a sprint
Joining a sprint
CREATE__SPRINT (SprintName, Username) => (SprintID, SprintName, username, [Users])
JOIN__SPRINT (SprintID,Username) => (SprintID, SprintName, username, [Users])

*/
