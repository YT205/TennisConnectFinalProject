import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "./Firebase";
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Btn from "../components/Btn"
import firebase from 'firebase/compat';
  
export default function Home({ navigation }) {
  

    return (
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 34, fontWeight: "800", marginBottom: 20}}></Text>
        <Btn title="Log Out" onClick={() => firebase.auth().signOut()} />
        <Btn title="Update Account Info" onClick={() => navigation.navigate('Edit')} />
        <Btn title="Friends" onClick={() => navigation.navigate('Friends')} />
        <Btn title="Requests" onClick={() => navigation.navigate('Requests')} />
      </SafeAreaView>
    );
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CAD1D5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#30B731',
      width: '90%',
      marginVertical: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 2,
      padding: 10,
    },
    list: {
      flexDirection: "column",
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    item: {
      backgroundColor: '#68c7ed',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    quest: {
      fontSize: 24,
    },
    desc: {
      fontSize: 12,
    },
  });
  
  function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }