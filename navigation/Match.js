import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, ScrollView, RefreshControl, SectionList } from 'react-native';
import { React, useEffect, useState, useCallback } from 'react';
import { db } from "./Firebase";
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { setDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Btn from '../components/Btn';
import 'react-native-gesture-handler';

class User {
  constructor(uid, utr, age, name, gender, contact, email, rightHand, latitude, longitude, friends, requests) {
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
    this.friends = friends;
    this.requests = requests;
  }
}

export default function Match({ navigation }) {
  const [userArr, onChangeArray] = useState([])
  const [filteredArr, onChangeFArray] = useState([])

  const [userLat, setLat] = useState(null);
  const [userLon, setLong] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const [handFilterR, setHandR] = useState(true);
  const [handFilterL, setHandL] = useState(true);
  const [genderFilterM, setGenderM] = useState(true);
  const [genderFilterF, setGenderF] = useState(true);
  const [UTRFilterMin, setUTRMin] = useState(0);
  const [UTRFilterMax, setUTRMax] = useState(17);
  const [rangeFilter, setRange] = useState(5);

  var handR = navigation.getParam('handR');
  var handL = navigation.getParam('handL');
  var genderM = navigation.getParam('GenderM');
  var genderF = navigation.getParam('GenderF');
  var UTRMin = navigation.getParam('UTRMin');
  var UTRMax = navigation.getParam('UTRMax');
  var range = navigation.getParam('range');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setConst();
  }, [handR, handL, genderM, genderF, UTRMax, UTRMin, range])

  function setConst(){
    setHandL(handL);
    setHandR(handR);
    setGenderF(genderF);
    setGenderM(genderM);
    setUTRMin(UTRMin);
    setUTRMax(UTRMax);
    setRange(range);
  }

  useEffect(() => {
    clearUsers();
  }, [handFilterR, handFilterL, genderFilterM, genderFilterF, UTRFilterMax, UTRFilterMin, rangeFilter])

  useEffect(() => {
    readUsers();
    getCoords();
  }, [filteredArr])

  async function getCoords(){
    const uid = user.uid;
    const ref = doc(db, "Users", uid).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const user = docSnap.data();
      setLat(user.latitude);
      setLong(user.longitude);
    }else {
      console.log("No such document!");
    }
  }

  async function clearUsers() {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const tempNames = []
    querySnapshot.forEach((doc) => {
      tempNames.push(doc.id);
    });
    onChangeFArray(tempNames);
  }

  async function readUsers() {
    var tempQuestionsArray = []
    filteredArr.forEach(async (name) => {
      const ref = doc(db, "Users", name).withConverter(userConverter);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const user = docSnap.data();
        if(handMatch(user.rightHand) && genderMatch(user.gender) && UTRFilterMax >= user.utr && UTRFilterMin <= user.utr && 
        checkDistance(user.latitude, user.longitude) <= rangeFilter){
          tempQuestionsArray.push({uid: user.uid, utr: user.utr, age: user.age, name: user.name, gender: user.gender, 
            contact: user.contact, email: user.email, hand: user.rightHand, latitude: user.latitude, longitude: user.longitude, 
            friends: user.friends, requests: user.requests});
        }
      }else {
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
        latitude: user.latitude,
        longitude: user.longitude,
        friends: user.friends,
        requests: user.requests,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.uid, data.utr, data.age, data.name, data.gender, data.contact, data.email, data.rightHand, 
        data.latitude, data.longitude, data.friends, data.requests);
    }
  };

  function checkDistance(lati1, long1){
    var lat1 = lati1 / 57.29577951;
    var lon1 = long1 / 57.29577951;
    var lat2 = userLat / 57.29577951;
    var lon2 = userLon / 57.29577951;

    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    dlat = Math.abs(dlat);
    dlon = Math.abs(dlon);

    var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var r = 3956;
    var d = c * r;
    d = d * 10;
    d = Math.round(d);
    d = d / 10;

    return d;
  }

  function genderMatch(user){
    if(user == 'Male' && genderFilterM){
      return true;
    }
    else if(user == 'Female' && genderFilterF){
      return true;
    }
    else{
      return false;
    }
  }

  function handMatch(user){
    if(user == 'Right' && handFilterR){
      return true;
    }
    if(user == 'Left' && handFilterL){
      return true;
    }
    return false;
  }

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   readUsers();
  // }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
        keyExtractor={item => item.uid}
        data = {userArr}
        renderItem={({item}) => (
          <View style={styles.items}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>Age: {item.age}</Text>
              <Text style={styles.desc}>UTR: {item.utr}</Text>
              <Text style={styles.desc}>Gender: {item.gender}</Text>
              <Text style={styles.desc}>Hand: {item.hand}</Text>
            </TouchableOpacity>
          </View>
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />

      <View style = {styles.mainConatinerStyle}>
        <Btn onClick={() => 
          navigation.navigate('Filter', {handFilterL: handFilterL, handFilterR: handFilterR, 
            genderFilterF: genderFilterF, genderFilterM: genderFilterM, 
            UTRFilterMin: UTRFilterMin, UTRFilterMax: UTRFilterMax, rangeFilter: rangeFilter})} 
          title="Filter" 
          style={styles.floatingMenuButtonStyle}/>
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
  list: {
    flexDirection: "column",
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  name: {
    fontSize: 24,
    color: "white"
  },
  desc: {
    fontSize: 16,
    color: "#b8bab9"
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