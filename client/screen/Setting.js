import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
const host = "http://192.168.1.137:4000";


export default function SettingScreen({ navigation }) {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  
    socketRef.current.on('getId', data => {
      setId(data)
    })

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data])
      scrollToBottom()
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if(message !== null) {
      const msg = {
        content: message, 
        id: id
      }
      socketRef.current.emit('sendDataClient', msg)
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  

  const renderMess =  mess.map((m, index) => 
        <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
          {m.content}
        </div>
      )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }
  
  return (
    <View>
    <Text>
        {renderMess}
    </Text>
  
    <View  >
        <TextInput 
          value={message}  
          onChange={handleChange} 
          onKeyDown={onEnterPress}
          placeholder="Nhập tin nhắn ..." 
        />
       <TouchableOpacity onPress={() => sendMessage()}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Log In</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}