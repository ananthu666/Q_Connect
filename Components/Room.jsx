import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for the plus icon
import supabase from "./supa_config";
const RoomList = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [mid, setmid] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase.from("rooms").select("*");
        if (error) {
          console.error("Error fetching rooms:", error.message);
        } else {
          setChatRooms(data);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error.message);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchmyid = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setmid(user.email);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error.message);
      }
    };
    fetchmyid();
  }, []);
  // Function to handle when the plus icon button is clicked
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Function to handle when a room is clicked
  
    // push to the chat room with the given ID
    // Function to handle when a room is clicked
    const handleChat = (roomId, roomName) => {
      console.log("helloworld", roomName);
      navigation.push("Room_chat", {
        s_id: mid,
        room_id: roomId,
        room_name: roomName,
      });
    };
  

  // Function to handle form submission
  const handleSubmit = async () => {
    // Create a new room object
    try {
      const { data, error } = await supabase
        .from("rooms")
        .insert([{ room_name: roomName, description: roomDescription }]);
    } catch (e) {
      console.log(e);
    }
    const newRoom = {
      id: (Math.random() * 1000).toString(), // Generate a random ID
      name: roomName,
      description: roomDescription,
    };

    // Add the new room to the chatRooms array
    setChatRooms([...chatRooms, newRoom]);

    // Reset form fields
    setRoomName("");
    setRoomDescription("");
  };

  // Render item component for each chat room
  // Render item component for each chat room
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleChat(item.id, item.room_name)}
    >
      <Text style={styles.roomName}>{item.room_name}</Text>
      <Text style={styles.roomDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Space</Text>
        <TouchableOpacity onPress={toggleForm}>
          <MaterialIcons
            name={showForm ? "remove" : "add"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={roomName}
            onChangeText={setRoomName}
            placeholder="Room Name"
          />
          <TextInput
            style={styles.input}
            value={roomDescription}
            onChangeText={setRoomDescription}
            placeholder="Room Description"
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}

      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set the number of columns for grid layout
        contentContainerStyle={styles.roomList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e5ddd5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  roomList: {
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold', // Make the room name bold
    marginBottom: 5, // Add some space between room name and description
    color: '#075e54'
  },
  roomDescription: {
    fontSize: 14,
    color: '#4169E1', // Set a color for the room description
  },
});

export default RoomList;
