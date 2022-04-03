const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")
const { Server } = require("socket.io");
const { createClient } = require('redis')
require('dotenv').config();
const cookieParser = require('cookie-parser')


app.use(cors()) 

app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))


//redis simple example

const redisSet = async ()=>{

  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));


  await client.connect();
  

  await client.set('name', 'nurettin');
client.set("name",)
  const value = await client.get('name');

console.log(value)

//del
let delVal = await client.del('name');
console.log(delVal)
const valueDel = await client.get('name');

console.log(valueDel)

const numAdded = await client.zAdd('vehicles', [
  {
    score: 4,
    value: 'car'
  },
  {
    score: 2,
    value: 'bike'
  }
]);


  for await (const { score, value } of client.zScanIterator('vehicles')) {
      console.log(`${value} -> ${score}`);

    }

}
redisSet()




const serverApp = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})

// socket exmample
const io = new Server(serverApp,{

    cors:{
        origin:process.env.REACT_APP_URI,
        credentials:true,
        methods: ["GET","POST","PUT",]
    }


});

let info =  {

}

io.on('connection', (socket) => {
    console.log("socketId " + socket.id)
  
    socket.on("join_room", async(arg, callback) => {
        console.log(arg.name + "joined room"); 

       await socket.join(arg.roomId)
       
    socket.broadcast.emit("receiving_messageUser", arg); 

    socket.to(arg.roomId).emit("receiving_message", arg);
  

      
      });

      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_senderMessage", data);
      });

      socket.on("leave_room", (data) => {
        socket.leave(data.room);
        console.log(data)
        socket.to(data.room).emit("leave_user",data.author);
      });

      socket.on("typing", (state) => {
        
        if(state){
          info.message = "Typing user"
        }else{
          info.message = "not Typing  user"
        }
        socket.broadcast.emit("tping__user", info);
     
      });

     

    socket.on("disconnect",(arg,callback)=>{
        console.log("user disconnect" + socket.id)
        socket.broadcast.emit("disUser", socket.id);

    })

  });

  io.of("/ticket").on("connection",(socket)=>{
    console.log("socketId sport kok dizine baglandı " + socket.id)

    

    socket.on("disconnect",(arg,callback)=>{

      console.log("user disconnect" + socket.id)
     
      
    
  })

  })
  


  

module.exports = serverApp