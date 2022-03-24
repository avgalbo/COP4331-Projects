import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons' ;




export default function App() {
  return (
    <View style={styles.container}>
      <Feather name = 'user' size = {60} color = "red" />
      <Text> Name </Text>
      <StatusBar style ="auto" />
    
    <View style = {styles.containerA}>
      <Feather name = 'square' size = {40} color = "black" />
      <Image 
        source={require('./assets/towels.png')} 
        style={{ width: 40, height: 40 }}
      />;
      <Text> Towels</Text>
      <StatusBar style ="auto" />
    </View>
    
    <View style = {styles.containerA}>
      <Feather name = 'square' size = {40} color = "blue" />
      <Text> Sheets</Text>
      <StatusBar style ="auto" />
    </View>

    <View style = {styles.containerA}>
      <Feather name = 'square' size = {40} color = "green" />
      <Text> Pillows</Text>
      <StatusBar style ="auto" />
    </View>
    </View>

   

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
  containerA: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'right',
    justifyContent: 'bottom',
  },

});
