import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'; // Import StyleSheet
import  supabase  from './supa_config'; // Import the supabase client



const DoctorList = ({navigation}) => {
    // Define an array of doctors and psychologists
    
    const [doctors,setdoctors]=useState([]);
    const [mid,setmid]=useState("");
    const [cid,setcid]=useState([]);
    // const doctors = [
    //     { id:1,name: 'Dr. John Doe', specialization: 'Psychiatrist' },
    //     { id:2,name: 'Dr. Jane Smith', specialization: 'Psychologist' },
    //     // Add more doctors and psychologists as needed
    // ];
    useEffect(() => {
        const fetch_drs = async () => {
            try {
                const { data, error } = await supabase
                    .from('user_table')
                    .select('*')
                    .in("user_id", cid);
                if (error) {
                    console.error('Error fetching doctors:', error.message);
                } else {
                    setdoctors(data);
                    console.log("data",data);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error.message);
            }
        };
        fetch_drs();
    
    }, [cid]);
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
      useEffect(() => {
        const fetchClientId = async () => {
            try {
                const { data, error } = await supabase
                    .from('dr_messages')
                    .select('sender_id')
                    .eq('reciever_id', mid);
                if (error) {
                    console.error('Error fetching client ID:', error.message);
                } else {
                    setcid((prevCid) => [ ...data.map(item => item.sender_id)]);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error.message);
            }
        };
        if (mid) {
            fetchClientId();
        }
    }, [mid]);
      console.log("cid",cid);
    // Function to handle chat initiation
    const handleChat = (doctor) => {
        
        navigation.navigate('Dr_chat', { s_id: mid , r_id: doctor.dr_id,userName:doctor.username});
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Doctors and Psychologists</Text>
            <View style={styles.doctorList}>
                {doctors.map((doctor, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => handleChat(doctor)}
                        style={styles.doctorItem}
                    >
                        <Text style={styles.doctorUsername}>{doctor.username}</Text>
                        <Text style={styles.doctorSpecialization}>{doctor.user_id}</Text>
                        
                        
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e5ddd5', // WhatsApp background color
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#075e54', // WhatsApp title color
    },
    doctorList: {
        marginTop: 10,
    },
    doctorItem: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#fff', // WhatsApp chat background color
        borderRadius: 10,
        elevation: 2, // Add shadow effect
    },
    doctorUsername: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    doctorSpecialization: {
        fontSize: 16,
        color: 'green', // Green color for specialization
    },
});


export default DoctorList;
