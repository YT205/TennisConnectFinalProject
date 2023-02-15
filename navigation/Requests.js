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

    const usersRef = collection(db, "Users");

    useEffect(() => {
        readUsers();
    }, [])

    async function readUsers(){
        const ownUid = user.uid;
        const docRef = doc(db, "Users", ownUid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if(data.requests.length > 0){
            var requestArr = [...data.requests]
        }
        else{
          return;
        }
        var info = [];
        const q = await getDocs(collection(db, "Users"));
        q.forEach((doc) => {
            if(requestArr.indexOf(doc.id) >= 0){
                var data = doc.data();
                info.push({name: data.name, utr: data.utr, age: data.age, hand: data.rightHand, gender: data.gender, uid: data.uid})
            }
        });
        onChangeInfoArray(info)
    }

    async function acceptRequest(item){
        const ownUid = user.uid;
        const docRef = doc(db, "Users", ownUid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        var requestArr = [...data.requests]
        if(requestArr.indexOf(item.uid) >= 0){
          requestArr.splice(requestArr.indexOf(item.uid), 1);
        }
        if(data.friends.length > 0){
          var friendsArr = [...data.friends]
        }
        else{
          var friendsArr = [];
        }
        friendsArr.push(item.uid);
        await setDoc(doc(usersRef, ownUid), {
          requests: requestArr,
          friends: friendsArr
        },
        {
          merge: true
        });

        const docRef2 = doc(db, "Users", item.uid);
        const docSnap2 = await getDoc(docRef2);
        const data2 = docSnap2.data();
        if(data2.friends.length > 0){
          var friendsArr2 = [...data2.friends]
        }
        else{
          var friendsArr2 = [];
        }
        friendsArr.push(item.uid);
        await setDoc(doc(usersRef, item.uid), {
          friends: friendsArr2
        },
        {
          merge: true
        });
        alert("You are now friends with " + item.name);
    }

    async function rejectRequest(item){
      const ownUid = user.uid;
        const docRef = doc(db, "Users", ownUid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        var requestArr = [...data.requests]
        if(requestArr.indexOf(item.uid) >= 0){
          requestArr.splice(requestArr.indexOf(item.uid), 1);
        }
        await setDoc(doc(usersRef, ownUid), {
          requests: requestArr,
        },
        {
          merge: true
        });
        alert("You rejected " + item.name + "'s request")
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
                <Btn
                    title="Accept Request"
                    onClick={() => {
                        acceptRequest(item)
                    }}
                    style={styles.buttonsContainer}
                />
                <Btn
                    title="Reject Request"
                    onClick={() => {
                        rejectRequest(item)
                    }}
                    style={styles.buttonsContainer2}
                />
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
    buttonsContainer2: {
      backgroundColor: '#d41e11',
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
  
  function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }