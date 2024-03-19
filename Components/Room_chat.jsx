import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import  supabase  from './supa_config';
import { MaterialIcons } from '@expo/vector-icons';
const Dr_chat = ({ route }) => {
  const flatListRef = useRef();
  const { s_id, room_id } = route.params;
  
  const [messages, setMessages] = useState([]);
  const [messagelen, setMessagelen] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setsender] = useState(s_id);
  const [roomid, setroomid] = useState(room_id);
  const [contentSize, setContentSize] = useState(0);
  
  const fetchMessages = async () => {
    
    try {
      const { data, error } = await supabase
        .from("room_messages")
        .select("id,room_id, sender_id, content, time")
        .eq("room_id", roomid)
        .order("time", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
        setMessagelen(data.length);
        // console.log("Messages fetched", messages);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMessages();
        console.log("Fetch messages completed");
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [contentSize]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    try {
      const { data, error } = await supabase.from("room_messages").upsert([
        {
          sender_id: sender,
          room_id: roomid,
          content: newMessage,
        },
      ]);

      if (error) {
        console.error("Error sending message:", error.message);
      } else {
        setMessages((messages) => [
          ...messages,
          {
            id: messagelen,
            content: newMessage,
            sender_id: sender,
          },
        ]);
        setMessagelen(messagelen + 1);
        setNewMessage("");
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
    }
  };
  const extractNameFromEmail = (email) => {
    // Split the email by '@'
    const parts = email.split('@');
    // Return the first part (the name)
    return parts[0];
  };
  const renderMessageItem = ({ item }) => (
    <View style={item.sender_id === sender ? styles.userMessage : styles.otherMessage}>
      <Text style={styles.messageSender}>{item.sender_id === sender ? 'You' : extractNameFromEmail(item.sender_id)}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessageItem}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setContentSize(contentHeight);
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <MaterialIcons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  userMessage: {
   alignSelf: "flex-end",
    
    maxWidth: '90%',
    minWidth: 50,
    backgroundColor: "#DCF8C5",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
   // alignItems: "flex-end",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: "#CCCCCC",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    //backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  messageSender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Dr_chat;