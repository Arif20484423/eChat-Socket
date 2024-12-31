const express = require("express")
const cors= require('cors')
const app= express();
const http= require("http")
const {Server} = require("socket.io")

app.use(cors());
const server = http.createServer(app)



const io= new Server(server,{
    origin:"http://localhost:3000",
    method:["GET","POST"]
})

io.on("connection",(socket)=>{
    
})


server.listen("4000",()=>{
    console.log("Socket server running")
})