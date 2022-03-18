import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import Btn from "../components/Btn"
import Txt from "../components/TextBox"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { getAuth } from 'firebase/auth'
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from "./Firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

export default function editAccount() {

    const [age, onChangeAge] = useState(null);
    const [utr, onChangeUTR] = useState(null);
    const [contact, onChangePhone] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [name, onChangeName] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "Users");

    async function Create() {
      console.log("hi")
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
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, contact: contact, gender: gender, name: name, uid: uid});
            onChangeAge("");
            onChangeUTR("");
            onChangePhone("");
            onChangeGender("");
            onChangeName("");
            alert("Your info has been posted!")
        }
    }
  

  return (

    <SafeAreaView>
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
        </View>
  
        <View style={styles.buttonsContainer}>
          <Btn onClick={() => Create()} title="Update Info" style={{ width: "48%" }} />
        </View>
    </SafeAreaView>
  )
}



