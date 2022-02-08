import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

//vivek change
//rudra change
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


export default function Maps() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Court Maps!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

