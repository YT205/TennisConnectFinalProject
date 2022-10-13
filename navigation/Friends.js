import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "./Firebase";
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import Btn from "../components/Btn"
import firebase from 'firebase/compat';
  
export default function Requests({ navigation }) {
    const [infoArr, onChangeInfoArray] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
      readUsers();
    }, [])

    async function readUsers(){
      const ownUid = user.uid;
      const docRef = doc(db, "Users", ownUid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if(data.friends.length > 0){
          var friendsArr = [...data.friends]
      }
      var info = [];
      const q = await getDocs(collection(db, "Users"));
      q.forEach((doc) => {
          if(friendsArr.indexOf(doc.id) >= 0){
              var data = doc.data();
              info.push({name: data.name, utr: data.utr, age: data.age, hand: data.rightHand, gender: data.gender, uid: data.uid,
              contact: data.contact, email: data.email})
          }
      });
      onChangeInfoArray(info)
  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <FlatList
            keyExtractor={item => item.uid}
            data = {infoArr}
            renderItem={({item}) => (
            <View style={styles.items}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>Age: {item.age}</Text>
                <Text style={styles.desc}>UTR: {item.utr}</Text>
                <Text style={styles.desc}>Gender: {item.gender}</Text>
                <Text style={styles.desc}>Hand: {item.hand}</Text>
                <Text style={styles.desc}>Phone: {item.contact}</Text>
                <Text style={styles.desc}>Email: {item.email}</Text>
            </View>
            )}
        />
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CAD1D5',
      justifyContent: 'center',
    },
    buttonsContainer: {
      backgroundColor: '#30B731',
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
    items: {
        backgroundColor: '#0F497B',
        padding: 14,
        borderRadius: 15,
        borderColor: "#234261",
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
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
    name: {
        fontSize: 24,
        color: "white"
    },
    desc: {
        fontSize: 16,
        color: "#b8bab9"
    },
  });