
import React,{useState,useRef,useCallback,useContext,useEffect} from 'react'
import io from "socket.io-client";
import 'antd/dist/antd.css';
import { message, Button, Space } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
const socket = io.connect("http://localhost:5000");






const PostsList =  ()=>{
  const success = (data) => {
    message.success(data);
  };

  const [username,setUsername] = useState("")
  


  const joinRoom = async () => {
   await socket.emit("join_room", {name :username});
      
  
  };

  useEffect(() => {
    socket.on("receiving_message",(data)=>{
   
      success(data)
  })
  
   
  }, [socket])
  

  


  
  return (
      
    <div className="App">
    
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="John..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
       
        <button onClick={joinRoom}>Join A Room</button>
      </div>
   
  </div>
  
 
  );
}

export default PostsList





    