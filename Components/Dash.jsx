import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import MindCare from './MindCare';
import Room from './Room';
import Home from './Home';
import supabase from './supa_config';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut()
  }
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          alert("User logout  successfully");
          navigation.push("Login");
        }
      }
    );
    // Clean up the listener


  }, []);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'MindCare':
        return <MindCare navigation={navigation} />;
      case 'Rooms':
        return <Room navigation={navigation} />;
      case 'Home':
        return <Home navigation={navigation} />;
      //   case 'Map':
      //     return <MapTab />;
      //   case 'Notifications':
      //     return <NotificationsTab />;
      //   case 'Settings':
      //     return <SettingsTab />;
      //   default:
      //     return <HomeTab />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Q Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.btn}>Logout</Text>

        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Home' && styles.activeTab]}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'MindCare' && styles.activeTab]}
          onPress={() => setActiveTab('MindCare')}
        >
          <Text style={styles.tabText}>MindCare Connect</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.tab, activeTab === 'Rooms' && styles.activeTab]}
          onPress={() => setActiveTab('Rooms')}
        >
          <Text style={styles.tabText}>Rooms</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  btn: {

    backgroundColor: '#FF9B50',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',

    color: 'white',
    fontWeight: 'bold',
    width: 70,


    // marginRight: 10,



  }
});

export default DashboardScreen;
