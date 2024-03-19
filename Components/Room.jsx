import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState,useEffect } from 'react';
import supabase from './supa_config';

const RoomList = ({navigation}) => {
    const [mid, setmid] = useState("");
    // Assuming you have an array of chat rooms called 'chatRooms'
    const chatRooms = [
        { id: '1', name: 'Room 1' },
        { id: '2', name: 'Room 2' },
        { id: '3', name: 'Room 3' },
    ];
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

    // Function to handle when a room is clicked
    const handleChat = (roomId) => {
        // Navigate to the chat room with the given ID
        navigation.navigate('Room_chat', {s_id:mid,room_id: roomId});
    };

    // Render item component for each chat room
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleChat(item.id)}>
            <Text style={styles.roomName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Chat Rooms</Text>
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
        backgroundColor: '#e5ddd5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    roomList: {
        marginTop: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roomName: {
        fontSize: 16,
    },
});

export default RoomList;
