import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import http from "http";
import { Server } from "socket.io";
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CHATAPP_URL,
    method: ["GET", "POST"],
  },
});
app.get("/",(req,res)=>{
  res.json({success:true,message:"Server woke up"})
})

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket.user = data.room;
  });
  socket.on("message", (data) => {
    socket
      .to(data.to)
      .emit("message", { from: data.from, message: data.message });
  });
  socket.on("delete", (data) => {
    socket
      .to(data.to)
      .emit("delete", { from: data.from, messageid: data.messageid });
  });
  socket.on("groupmessage", (data) => {
    for (let i = 0; i < data.to.length; i++) {
      socket
        .to(data.to[i])
        .emit("message", { from: socket.user, message: data.message });
    }
  });
});

server.listen("4000", () => {
  console.log("Socket server running");
});
