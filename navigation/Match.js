import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default function Match() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Matchmaking!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


