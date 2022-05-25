const mongoose = require('mongoose');
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
app.use(cors())
app.use(express.json())
const { v4: uuidv4 } = require('uuid')
const Sprint = require("./models/sprint")
const Stories = require("./models/stories")
const User = require("./models/user")

/* Env variables */
const MONGO_URL = 'mongodb+srv://pokerplanner:pokerplanner2022@pokerplanner.wahup.mongodb.net/?retryWrites=true&w=majority'
const CLIENT_URL = 'http://localhost:3000'
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
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
  console.log('MongoDB connection successful')

  io.on('connection', socket => {
    async function sendNotification(sprintID) {
      let response = {
        sprintInfo: [],
        userInfo: [],
        storyInfo: [],
        timer: ''
      };
      const sprintInfo = await Sprint.find({ sprintID: sprintID })
      response.sprintInfo = sprintInfo

      const userInfo = await User.find({ sprintID: sprintID })
      response.userInfo = userInfo

      const storyInfo = await Stories.find({ sprintID: sprintID })
      response.storyInfo = storyInfo
      socket.emit('NOTIFICATION', response)

    }

    socket.on('CREATE__SPRINT', async data => {
      const ID = uuidv4()
      const name = data.sprintName
      const username = data.userName
      const isScrumMaster = false
      let sprint = new Sprint({
        sprintID: ID, sprintName: name, sprintMaster: username
      })
      const response = await sprint.save();
      if (response) {
        let user = new User({
          sprintID: ID, userName: username, isScrumMaster: isScrumMaster
        })
        const res = await user.save();
        if (res) {
          sendNotification(ID)
        }
      }
    })

    socket.on('JOIN__SPRINT', data => {
      if (data.sprintId) {
        sendNotification(data.sprintId)
      }
    })

    socket.on('CREATE_STORY', async data => {
      const title = data.title
      const description = data.description
      const acceptanceCriteria = data.acceptanceCriteria
      const sprintId = data.room
      let story = new Stories({
        title: title,
        description: description,
        acceptanceCriteria: acceptanceCriteria,
        sprintID: sprintId,
        storyPoints: ''
      })
      const response = await story.save();
      if (response) {
        sendNotification(sprintId)
      }
    })


    app.get('/getSprintById', async (req, res) => {
      if (req.query.sprintId) {
        const response = await Sprint.findOne({ sprintID: req.query.sprintId })
        if (response) {
          res.status(200).json({
            status: 'Success',
            data: response
          });
        }
        else {
          res.status(404).json({
            status: 'Sprint Id Not Found',
            data: null
          });
        }
      }
      else {
        res.status(404).json({
          status: 'Fail',
          data: null
        });
      }
    })

    app.get('/getSprintData', async (req, res) => {
      if (req.query.sprintId) {
        sendNotification(req.query.sprintId)
        res.status(200).json({
          status: 'Success',
          data: 'Notification Sent'
        });
      }
      else {
        res.status(404).json({
          status: 'Fail',
          data: null
        });
      }
    })


    app.post('/addUserToSprint', async (req, res) => {
      if (req.query.userName && req.query.sprintId) {
        let user = new User({
          sprintID: req.query.sprintId, userName: req.query.userName, isScrumMaster: false
        })
        const response = await user.save();
        if (response) {
          res.status(200).json({
            status: 'Success',
            data: response
          });
        }
      }
      else {
        res.status(404).json({
          status: 'Fail',
          data: null
        });
      }
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

{

sprintInfo : {},

userInfo: [{}],

storyInfo: {},

voteInfo: [{}],

timer:

}
*/
