import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';


export default function App() {

  const [quoteObj, setQuoteObj] = useState([{
    "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"},
]);
  const [randomIndex, setRandomIndex] = useState(0);

  const fetchQuotes = async () => {
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    const data = await response.json();
    setQuoteObj(data.quotes)
  }

  useEffect(() => {
    
  fetchQuotes();  
  
}, []);

  const quote = quoteObj['quote'];
  const author = quoteObj['author']
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quoteObj[randomIndex].quote}</Text>
      <Text style={styles.author}>- {quoteObj[randomIndex].author}</Text>
      <button 
      onClick={
        () => setRandomIndex(Math.floor(Math.random() * quoteObj.length))
        }>New Quote</button>
        <button><a href={tweetUrl}>Tweet</a></button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#badc58',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    textAlign: 'center',
    backgroundColor: '#ff7979',
    fontFamily: 'monospace',
    width: 300, 
    margin: 10,   
    paddingTop: 20,
    padding: 10,
    flex: 3,
    height: 50,
  },
  author: {
    textAlign: 'right',
    backgroundColor: '#f9ca24',
    fontFamily: 'monospace',
    padding: 20,
    width: 300,
    margin: 10,
    flex: 1,
  }
});