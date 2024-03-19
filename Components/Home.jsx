import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const NewsBox = ({ title, description, link, onPress }) => (
  <TouchableOpacity style={styles.newsBox} onPress={() => onPress(link)}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

const NewsList = ({ newsData, onPress }) => (
  <FlatList
    data={newsData}
    renderItem={({ item }) => (
      <NewsBox
        title={item.headline}
        // description={item.link}
        link={item.link}
        onPress={onPress}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);

const NewsScreen = () => {
  const newsData = [
    { id: 1, headline: 'News 1', link: 'https://www.example.com/news1' },
    { id: 2, headline: 'News 2', link: 'https://www.example.com/news2' },
    { id: 3, headline: 'News 3', link: 'https://www.example.com/news3' },
    // Add more news data as needed
  ];

  const handleNewsPress = (link) => {
    // Open the link in the browser
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <NewsList newsData={newsData} onPress={handleNewsPress} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    newsBox: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 0, // Increased border radius
      padding: 20, // Increased padding
      marginBottom: 20, // Increased margin bottom
      elevation: 2, // Add shadow effect
    },
    title: {
      fontSize: 20, // Increased font size
      fontWeight: 'bold',
      marginBottom: 10, // Increased margin bottom
    },
    description: {
      fontSize: 18, // Increased font size
    },
  });
  
export default NewsScreen;
