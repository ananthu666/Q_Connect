import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import scrapeNews from './ScrapeNews'; // Import the scrapeNews function

const NewsBox = ({ title, link, onPress }) => (
  <TouchableOpacity style={styles.newsBox} onPress={() => onPress(link)}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.link}>{link}</Text>
  </TouchableOpacity>
);

const NewsList = ({ newsData, onPress }) => (
  <FlatList 
    data={newsData}
    renderItem={({ item }) => (
      <NewsBox
        title={item.headline}
        link={item.link}
        onPress={onPress}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    scrapeNews()
      .then(data => {
        setNewsData(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNewsPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Breaking Stories</Text>
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
    borderRadius: 10,
   backgroundColor: '#ACE2E1',
    padding: 20,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  head:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#31363F',
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: 'blue',
  },
});

export default NewsScreen;
