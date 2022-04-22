import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import Btn from "../components/Btn"
import Txt from "../components/TextBox"

export default function Post({ navigation }) {
  var questionName = "";

  const [quest, onChangeQuestion] = useState(null);
  const [desc, onChangeDesc] = useState(null);

  const forumsRef = collection(db, "Forums");

  async function Create() {
    if(!quest){
      alert("Please Enter a Question");
    }
    else{
      questionName = getRandomString(10);
      await setDoc(doc(forumsRef, questionName), {question: quest, description: desc, id: questionName, answers: []});
      onChangeQuestion("");
      onChangeDesc("");
      alert("Your question has been posted!")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
            <Txt
                onChangeText={onChangeQuestion}
                value={quest}
                placeholder="Enter Question Here"
            />
            <Txt
                onChangeText={onChangeDesc}
                value={desc}
                placeholder="Enter Desription Here"
            />
            <Btn
                style={styles.buttonsContainer}
                onClick={() => Create()}
                color="#2145a6"
                title="Post"
            ></Btn>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30B731',
    width: '90%',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  quest: {
    fontSize: 24,
    fontFamily: "San-Fransisco",
    color: "#f0f0f0"
  },
  desc: {
    fontSize: 14,
    fontFamily: "San-Fransisco",
    color: "#c1c5c9"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#283340',
    borderBottomWidth: 2,
  },
  item: {
    backgroundColor: '#375e94',
    padding: 14,
    borderRadius: 15,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  }
});

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}