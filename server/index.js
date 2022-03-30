const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")
const { Server } = require("socket.io");

require('dotenv').config();
const cookieParser = require('cookie-parser')


app.use(cors()) 

app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))







const serverApp = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


const io = new Server(serverApp,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }


});


io.on('connection', (socket) => {
  
    socket.on("join_room", (arg, callback) => {
        console.log(arg.name + "joined room"); 

        socket.join(arg.roomId);
      
    socket.broadcast.emit("receiving_messageUser", arg); 
    socket.to(arg.roomId).emit("receiving_message", arg);
  
        // socket.emit("receiving_messageUser", arg)
      
      });


      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_senderMessage", data);
      });

      socket.on("leave_room", (data) => {
        socket.leave(data.room);
        console.log(data)
        socket.to(data.room).emit("leave_user",data.author);
      });



    socket.on("disconnect",(arg,callback)=>{
        console.log("user disconnect" + socket.id)
       

    })

  });


module.exports = serverApp