import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import Btn from "../components/Btn"
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

export default function editAccount() {

    const [age, onChangeAge] = useState(null);
    const [utr, onChangeUTR] = useState(null);
    const [phone, onChangePhone] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [name, onChangeName] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "Users");

    async function Create() {
        const uid = user.uid;
        if(!age){
            alert("Please Enter a Age");
        }
        else if(!utr){
            alert("Please Enter a UTR");
        }
        else if(!phone){
            alert("Please Enter a Phone");
        }
        else if(!gender){
            alert("Please Enter a Gender");
        }
        else if(!name){
            alert("Please Enter a Name");
        }
        else{
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, phone: phone, gender: gender, name: name, id: uid});
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
          <TextInput
            style={styles.input}
            onChangeText={onChangeAge}
            value={age}
            placeholder="Enter Age Here"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeUTR}
            value={utr}
            placeholder="Enter UTR Here"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhone}
            value={phone}
            placeholder="Enter Phone Here"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeGender}
            value={gender}
            placeholder="Enter Gender Here"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Enter Name Here"
          />
        </View>
  
        <View style={styles.buttonsContainer}>
          <Button
            onPress={Create}
            title="Post Info"
          ></Button>
        </View>
    </SafeAreaView>
  )
}



