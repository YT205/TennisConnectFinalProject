import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, Switch, ScrollView } from 'react-native';
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
import DatePicker from 'react-native-modern-datepicker';
import { Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

export default function editAccount() {
    const [utr, onChangeUTR] = useState(null);
    const [contact, onChangePhone] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [name, onChangeName] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [note, onChangeNote] = useState(null);
    const [rightHand, setHand] = useState(null);
    const [lat, onChangeLat] = useState(null);
    const [lon, onChangeLon] = useState(null);
    const [sendLoc, onChangeSend] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "Users");
  
    useEffect(() => {
      getLocation();
    }, [])

    async function Create() {
        const uid = user.uid;
        if(!utr){
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
              uid: uid, email: email, note: note, rightHand: rightHand, latitude: null, longitude: null});
          }
          onChangeUTR("");
          onChangePhone("");
          onChangeGender("");
          onChangeName("");
          onChangeEmail("");
          onChangeNote("");
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
    <View style = {styles.container}>
      <ScrollView>
            <Text style = {styles.item1}>
              Set Birthdate:
            </Text>

            <DatePicker
              onSelectedChange={date => setSelectedDate(date)}
              style={{ borderRadius: 10, width: '90%', height:'10%' }}
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
              onChangeText={onChangeName}
              value={name}
              placeholder="Enter Name Here"
            />
            <Txt
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Optional Email Here"
            />
            <Txt
              onChangeText={onChangeNote}
              value={note}
              placeholder="Enter a Note for Other Users to Contact You"
            />     

            <View>
                <Text style = {styles.text2}>
                  Gender Preference:
                </Text>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeGender(itemValue)
                }>
                <Picker.Item label="" value="None" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>

            <View style = {styles.item2}>
              <Picker
                  selectedValue={rightHand}
                  onValueChange={(itemValue, itemIndex) =>
                    setHand(itemValue)
                  }>
                  <Picker.Item label="" value="None" />
                  <Picker.Item label="Right" value="Right" />
                  <Picker.Item label="Left" value="Left" />
              </Picker>
            </View>

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

            <View style={styles.buttonsContainer}>
              <Btn onClick={() => Create()} title="Update Info" style={{width: "48%"}} />
            </View>

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll:{
    flex: 1
  },
  text2: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "blue",
    textDecorationLine: 'underline'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  floatingMenuButtonStyle: {
    width: 90,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
  input2: {
    justifyContent: 'flex-end',
    height: 90,
    width: 250,
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
  item1: {
    backgroundColor: '#68c7ed',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: '#375e94',
    padding: 0,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
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