
import React,{useState,useRef,useCallback,useContext,useEffect} from 'react'
import io from "socket.io-client";
import 'antd/dist/antd.css';
import { message, Button, Space } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
const socket = io.connect("http://localhost:5000"); //global namespace
import Chat from "./Chat"
import "./../index.css";




const Room =  ()=>{
  const success = (data) => {
    message.success(data);
  };

  const [username,setUsername] = useState("")
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [currentUser,setCurrentUser] = useState([])

  const joinRoom = async () => {
   await socket.emit("join_room", {name :username,roomId:room});
   setShowChat(true);

  };

  useEffect(() => {
    socket.on("receiving_message",(data)=>{
   
      success(`${data.name}  odaya giriş yaptı`)
     
  })

  socket.on("receiving_messageUser",(data)=>{
   
    setCurrentUser((list) => [...list, data.name])
})
  


   
  }, [socket])
  


  


  
  return (
      
    <div className="App">
    
    {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} currentUser={currentUser} username={username} room={room} setShowChat={setShowChat} showChat={showChat}/>
      
        
      )}
   
  </div>
  
 
  );
}

export default Room





    