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
        origin:"http://localhost:3000",
        credentials:true,
        methods: ["GET","POST","PUT",]
    }


});


io.on('connection', (socket) => {
    console.log('a user connected' + socket.id);

    socket.on("disconnect",()=>{
        console.log("user disconnect" + socket.id)
    })

  });





const serverApp = server.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


module.exports = serverApp