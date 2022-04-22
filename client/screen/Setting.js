import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
const host = "http://172.16.10.166:4000";

export default function SettingScreen({ navigation }) {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataServer", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);

    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const renderMess = mess.map((m, index) => {
    if (m.id === id) {
  
      return <View
      style={{
        fontSize: 20,
        marginBottom: 10,
        height: 40,
        color: '#fff',

        alignItems: "flex-end"

      }}
      >
    <View
         style={{
          width: '50%',
          backgroundColor: 'red',
          borderRadius: 10,
        }}
    >
    <Text
      key={index}
      style={{
        fontSize: 20,
        height: 40,
        color: '#fff',
        paddingTop: 10,
        paddingRight: 10,
        textAlign: "right"

      }}
    >
      {m.content}
    </Text>
    </View>
      </View>
    } else {
      return <View
      style={{
        fontSize: 20,
        width: '50%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#868686',
        height: 40,
        color: '#fff',
        paddingTop: 10,
        paddingLeft: 10,
        textAlign: "left"

      }}
      >
  <Text
        key={index}
        style={{
          fontSize: 20,
          width: '50%',
          marginBottom: 10,
          height: 40,
          color: '#fff',
        }}
      >
        {m.content}
      </Text>
      </View>
    
    }
  });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  return (
    <View
      style={{
        margin: 10,
        width: "95%",
        marginTop: 10,
      }}
    >
      <View
        style={{
          height: "94%",
          flexDirection: "column",
        }}
      >
        {renderMess}
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            width: "90%",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginEnd: 5,
          }}
          value={message}
          onChangeText={setMessage}
          onKeyDown={onEnterPress}
          placeholder="Nhập tin nhắn ..."
        />
        <TouchableOpacity onPress={() => sendMessage()}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#000",
              fontSize: 18,
              marginTop: 9,
            }}
          >
            Gửi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
