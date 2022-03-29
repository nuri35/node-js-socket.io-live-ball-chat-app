const express = require("express")
const app = express()
const http = require('http');
const bodyParser = require("body-parser")
const cors = require("cors")
const { Server } = require("socket.io");
const server = http.createServer(app);
require('dotenv').config();
const cookieParser = require('cookie-parser')


app.use(cors()) 

app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))



const io = new Server(server,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }


});


io.on('connection', (socket) => {
  

    socket.on("join_room", (arg, callback) => {
        console.log(arg.name + "joined room"); // "world"
     
       socket.broadcast.emit("receiving_message", `${arg.name} joined room`);
      });




    socket.on("disconnect",(arg,callback)=>{
        console.log("user disconnect" + socket.id)
       

    })

  });





const serverApp = server.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


module.exports = serverApp