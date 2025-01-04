const express = require("express");
const cors = require("cors");
const app = express();
const http= require("http");
const { Server } = require("socket.io");
require("dotenv").config()
app.use(cors());
const server = http.createServer(app);

console.log(process.env.CHATAPP_URL)
const io = new Server(server, {
  cors: {
    origin: process.env.CHATAPP_URL,
    method: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("Connected ");
  socket.on("join_room",(data)=>{
    socket.join(data.room)
    socket.user=data.room;
    console.log("joined");
  })
  socket.on("message",(data)=>{
    console.log("msg to ")
    socket.to(data.to).emit("message",{from:socket.user,message:data.message})
  })


    
});

server.listen("4000", () => {
  console.log("Socket server running");
  
});
