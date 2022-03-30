import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { message, Button, Space } from 'antd';


function Chat({ socket, username, room,setShowChat,showChat,currentUser,setCurrentUser }) {
 
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
 


  const success = (data) => {
    message.success(data);
  };


  const sendMessage = async () => {


    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  const leaveRoom = async () => {
   let leaveRoomInfo = {
      room :room,
      author:username
    }
   
    await socket.emit("leave_room", leaveRoomInfo);
    setShowChat(!showChat)
   
  };


 
  useEffect(() => {
    socket.on("receive_senderMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("leave_user", (username) => {
      success(`${username} has left the room`)
     
      setCurrentUser(currentUser)
     
    });

  }, []);

  return (

    <div className="chat-window">
    
    <div className="col-md-4">
    <h3>Users</h3>
    <ul id="users">
    {currentUser.length == 0 ?  <p>Şuan kullanıcı yok </p> : currentUser.map((userList) => {
          return (
            <li >{userList}</li>
          );
        })}
          
          </ul>
    
    
    </div>
    
    <div className="chat-header">
      <p>Live Chat</p>
    </div>
    <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Hey..."
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
      <button onClick={leaveRoom}>&#9660;</button>
    </div>
  </div>
  )
};

export default Chat;