import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Btn from '../components/Btn';

class User {
  constructor(uid, utr, age, name, gender, contact, email, rightHand, latitude, longitude) {
    this.uid = uid;
    this.utr = utr;
    this.age = age;
    this.name = name;
    this.gender = gender;
    this.contact = contact;
    this.latitude = latitude;
    this.longitude = longitude;
    this.email = email;
    this.rightHand = rightHand;
  }
}

export default function Match({ navigation }) {
  const [userArr, onChangeArray] = useState([]);
  const [filterdArr, setFilter] = useState([]);
  var handFilterR = navigation.getParam('handR');
  var handFilterL = navigation.getParam('handL');
  var UTRFilter = navigation.getParam('UTR');
  var genderFilterM = navigation.getParam('male');
  var genderFilterF = navigation.getParam('female');
  var rangeFilter = navigation.getParam('range');

  useEffect(() => {
    readUsers();
  },[])

  useEffect(() => {
    filterPlayers();
  }, [handFilterR, handFilterL, UTRFilter, genderFilterM, genderFilterF, rangeFilter])

  async function readUsers() {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const tempNames = []
    querySnapshot.forEach((doc) => {
      tempNames.push(doc.id);
    });

    var tempQuestionsArray = []

    tempNames.forEach(async (name) => {
      const ref = doc(db, "Users", name).withConverter(userConverter);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const user = docSnap.data();
        tempQuestionsArray.push({uid: user.uid, utr: user.utr, age: user.age, name: user.name, gender: user.gender, 
          contact: user.contact, email: user.email, rightHand: user.rightHand});
      } else {
        console.log("No such document!");
      }
      onChangeArray(tempQuestionsArray);
    })
  }

  const userConverter = {
    toFirestore: (user) => {
      return {
        uid: user.uid,
        utr: user.utr,
        age: user.age,
        name: user.name,
        gender: user.gender,
        contact: user.contact,
        email: user.email,
        rightHand: user.rightHand,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.uid, data.utr, data.age, data.name, data.gender, data.contact, data.email, data.rightHand, data.latitude, data.longitude);
    }
  };


  function filterPlayers(){
    var tempArr = [];
    userArr.forEach((user) =>{
      // if((genderFilterM === user.gender || genderFilterF === user.gender) && (handFilterL === user.rightHand || handFilterR === user.rightHand) && 
      // UTRFilter === user.utr){
      //   tempArr.push(user);
      // }
      if((genderFilterM === user.gender) && (handFilterL === user.rightHand) && 
      UTRFilter === user.utr){
        tempArr.push(user);
      }
      tempArr.push(user);
    })
    setFilter(tempArr);
  }


  return (
    <SafeAreaView style={styles.container}>
    <FlatList
        keyExtractor={item => item.uid}
        data = {filterdArr}
        renderItem={({item}) => (
          <View style={styles.items}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>Age: {item.age}</Text>
              <Text style={styles.desc}>UTR: {item.utr}</Text>
              <Text style={styles.desc}>Email: {item.email}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style = {styles.mainConatinerStyle}>
        <Btn onClick={() => navigation.navigate('Filter')} title="Filter" style={styles.floatingMenuButtonStyle}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
    justifyContent: 'center',
  },
  
  list: {
    flexDirection: "column",
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  items: {
    backgroundColor: '#375e94',
    padding: 14,
    borderRadius: 15,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "white"
  },
  desc: {
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "#c1c5c9"
  },
  
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: 2,
  },
  mainConatinerStyle: {
    flexDirection: 'column',
    flex: 1
  },
  floatingMenuButtonStyle: {
    width: 90,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});