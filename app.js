const express = require('express')
const app = express()

const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
})

io.on('connection',(socket)=>{
  console.log(`User connected: ${socket.id}`)

  socket.on('JOIN__ROOM',(roomId)=>{
    socket.join(roomId)
  })

  socket.on("CREATE_STORY",(data)=>{
    console.log(data);
    socket.to(data.room).emit("STORIES",data)
  })
})


server.listen(4000,()=>{
  console.log("Server is running")
})