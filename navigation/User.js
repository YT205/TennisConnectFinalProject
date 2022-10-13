import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import Btn from '../components/Btn';
import { db } from "./Firebase";


export default function Answer({navigation}){

    const usersRef = collection(db, "Users");
    const auth = getAuth();
    const user = auth.currentUser;

    const Separator = () => (
      <View style={styles.separator} />
    );

    async function request(){
      // console.log("Requested");
      var uid = navigation.getParam('uid');
      const ownUid = user.uid;

      if(!navigation.getParam('requests')){
        // console.log("0")
        var pastRequests = [...navigation.getParam('requests')];
      }
      else if(navigation.getParam('requests').length == 0){
        // console.log("1")
        var pastRequests = [];
        pastRequests.push(ownUid);
      }
      else if(navigation.getParam('requests').indexOf(ownUid) < 0){
        var pastRequests = [...navigation.getParam('requests')];
        console.log("3")
      }
      else{
        // console.log("2")
        var pastRequests = [...navigation.getParam('requests')];
        pastRequests.push(ownUid);
      }
      console.log(pastRequests);
      await setDoc(doc(usersRef, uid), {
        requests: pastRequests
      },
      {
        merge: true
      }
      );
    }
  
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.name}>{navigation.getParam('name')}</Text>
          <Text style={styles.name}></Text>
          <Text style={styles.desc}>UTR: {navigation.getParam('utr')}</Text>
          <Text style={styles.desc}>Age: {navigation.getParam('age')}</Text>
          <Text style={styles.desc}>Gender: {navigation.getParam('gender')}</Text>
          <Text style={styles.desc}>Hand: {navigation.getParam('hand')}</Text>
          {/* <Text style={styles.desc}>Phone Number: {navigation.getParam('contact')}</Text>
          <Text style={styles.desc}>Email: {navigation.getParam('email')}</Text> */}
        </View> 
        <View>
          <Btn
            title="Request Contact Info"
            style={styles.buttonsContainer}
            onClick={() => {
              request()
            }}
          />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CAD1D5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainItem: {
      backgroundColor: '#375e94',
      padding: 14,
      borderRadius: 15,
      borderColor: "#234261",
      borderWidth: 1,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    buttonsContainer: {
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#30B731',
      width: '100%',
      marginVertical: 10,
      fontFamily: "San-Fransisco",
    },
    item: {
      backgroundColor: '#375e94',
      padding: 20,
      borderRadius: 5,
      borderColor: "#234261",
      borderWidth: 1,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    name: {
      fontSize: 32,
      color: "white"
    },
    desc: {
      fontSize: 24,
      color: "#e6e6e6"
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: 2,
    },
  });