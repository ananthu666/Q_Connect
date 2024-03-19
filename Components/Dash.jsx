import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MindCare from './MindCare';
import Room from './Room';
import Home from './Home';
const DashboardScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'MindCare':
        return <MindCare navigation={navigation}/>;
      case 'Rooms':
        return <Room navigation={navigation}/>;
      case 'Home':
        return <Home navigation={navigation}/>;
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
        <Text style={styles.headerText}>Expo Dashboard</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

export default DashboardScreen;
