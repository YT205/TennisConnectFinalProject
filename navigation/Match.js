import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';

class User {
  constructor(uid, utr, age, name, gender, contact) {
    this.uid = uid;
    this.utr = utr;
    this.age = age;
    this.name = name;
    this.gender = gender;
    this.contact = contact;
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
        tempQuestionsArray.push({uid: user.uid, utr: user.utr, age: user.age, name: user.name, gender: user.gender, contact: user.contact});
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
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.uid, data.utr, data.age, data.name, data.gender, data.contact);
    }
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        keyExtractor={item => item.uid}
        data={userArr}
        renderItem={({item}) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
              <Text style={styles.name}>Name: {item.name}</Text>
              <Text style={styles.desc}>UTR: {item.utr}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}


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
  name: {
    fontSize: 24,
  },
  desc: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: 2,
  },
});