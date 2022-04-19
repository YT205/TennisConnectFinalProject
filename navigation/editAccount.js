import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, Switch } from 'react-native';
import { React, useEffect, useState } from 'react';
import Btn from "../components/Btn"
import Txt from "../components/TextBox"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth'
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from "./Firebase";
import * as Location from 'expo-location'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
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
    width: 300,
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
  text: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "#f0f0f0"
  },
  itemSwitch: {
    backgroundColor: '#375e94',
    padding: 10,
    borderRadius: 25,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
});

export default function editAccount() {
    const [age, onChangeAge] = useState(null);
    const [utr, onChangeUTR] = useState(null);
    const [contact, onChangePhone] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [name, onChangeName] = useState(null);
    const [lat, onChangeLat] = useState(null);
    const [lon, onChangeLon] = useState(null);
    const [sendLoc, onChangeSend] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "Users");

    const apiKey = 'AIzaSyDUipSL9QVWpu4-z3oV6NvHcdbGILaDKhw';

    useEffect(() => {
      getLocation();
    }, [])

    async function Create() {
        const uid = user.uid;
        if(!age){
          alert("Please Enter a Age");
        }
        else if(!utr){
          alert("Please Enter a UTR");
        }
        else if(!contact){
          alert("Please Enter a contact");
        }
        else if(!gender){
          alert("Please Enter a Gender");
        }
        else if(!name){
          alert("Please Enter a Name");
        }
        else{
          if(sendLoc){
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, contact: contact, gender: gender, name: name, 
              uid: uid, latitude: lat, longitude: lon});
          }
          else{
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, contact: contact, gender: gender, name: name, 
              uid: uid, latitude: null, longitude: null});
          }
          onChangeAge("");
          onChangeUTR("");
          onChangePhone("");
          onChangeGender("");
          onChangeName("");
          alert("Your info has been posted!")
        }
    }

    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(apiKey);
      let { coords } = await Location.getCurrentPositionAsync();
      onChangeLat(coords.latitude);
      onChangeLon(coords.longitude);
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Txt
            onChangeText={onChangeAge}
            value={age}
            placeholder="Enter Age Here"
          />
          <Txt
            onChangeText={onChangeUTR}
            value={utr}
            placeholder="Enter UTR Here"
          />
          <Txt
            onChangeText={onChangePhone}
            value={contact}
            placeholder="Enter Phone Here"
          />
          <Txt
            onChangeText={onChangeGender}
            value={gender}
            placeholder="Enter Gender Here"
          />
          <Txt
            onChangeText={onChangeName}
            value={name}
            placeholder="Enter Name Here"
          />
          <View style={styles.itemSwitch}>
            <Text style={styles.text}>Use Location: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={sendLoc ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={
                (oldVal) => {onChangeSend(oldVal)}
              }
              value={sendLoc}
            />
          </View>
        </View>
  
        <View style={styles.buttonsContainer}>
          <Btn onClick={() => Create()} title="Update Info" style={{width: "48%"}} />
        </View>
    </SafeAreaView>
  )
}



