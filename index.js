const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const cors = require('cors');

const {Server} = require('socket.io');
const { instrument } = require("@socket.io/admin-ui");

app.use(cors());

const io = new Server(server, {
    cors:{
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true
    }
})

io.on("connection", (socket)=> {
    console.log(socket.id);

    // socket.conn.on("packet", ({type, data})=> {
    //     console.log("Packet type : ", type);
    //     console.log("Packet Data : ", data);
    // })

    // Join Room
    socket.on("join_room", (data)=> {
        socket.join(data.roomID);
        console.log(`username : ${data.username} with SocketID : ${data.userID} joined in room : ${data.roomID}`);
    })

    // Leave Room
    socket.on("leave_room", (data)=> {
        console.log("hfdj");
        console.log("----->",data.roomID);
        socket.leave(data.roomID);
    })

    // Send Message
    socket.on("send_message", (data)=> {
        socket.in(data.room).emit("received_message", data);
        console.log(data);
    })


})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING !!!")
})

instrument(io, {
    auth: false,
    mode: "development",
  });
  