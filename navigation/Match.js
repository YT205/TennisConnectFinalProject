import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';

class User {
  constructor(uid, utr, age, name, gender, contact, latitude, longitude) {
    this.uid = uid;
    this.utr = utr;
    this.age = age;
    this.name = name;
    this.gender = gender;
    this.contact = contact;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export default function Match({ navigation }) {
  const [userArr, onChangeArray] = useState([]);

  useEffect(() => {
    readUsers();
  }, [])

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
        tempQuestionsArray.push({uid: user.uid, utr: user.utr, age: user.age, name: user.name, gender: user.gender, contact: user.contact, 
          latitude: user.latitude, longitude: user.longitude});
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
        latitude: user.latitude,
        longitude: user.longitude
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.uid, data.utr, data.age, data.name, data.gender, data.contact, data.latitude, data.longitude);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={item => item.uid}
        data={userArr}
        renderItem={({item}) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>Age: {item.age}</Text>
              <Text style={styles.desc}>UTR: {item.utr}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  item: {
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
    color: "#f0f0f0"
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
});