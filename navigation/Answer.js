import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';

export default function Answer({navigation}){
    const [ans, onChangeAnswer] = useState(null);
    const [ansArr, onChangeArray] = useState([]);

    const forumsRef = collection(db, "Forums");

    useEffect(() => {
      readArray();
    }, [])

    async function create() {
      if(!ans){
        alert("Please Enter An Answer");
      }
      else{
        var tempName = getRandomString(10);
        var tempArray = [...ansArr, {a: ans, l: 0, i: tempName}];
        await setDoc(doc(forumsRef, navigation.getParam('i')), { question: navigation.getParam('q'),
         description: navigation.getParam('d'), id: navigation.getParam('i'), answers: tempArray});
        alert("Your answer has been posted!");
        onChangeAnswer("");
        onChangeArray(tempArray)
      }
    }

    async function readArray() {
      var tempAnswersArray = [];
      const ref = doc(db, "Forums", navigation.getParam('i'))
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const post = docSnap.data();
        tempAnswersArray = post.answers;
      } else {
        console.log("No such document!");
      }
      onChangeArray(tempAnswersArray);
    }

    async function likedAnswer(item, add) {
      var tempAnswersArray = [];
      const ref = doc(db, "Forums", navigation.getParam('i'))
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const post = docSnap.data();
        tempAnswersArray = post.answers;
      } else {
        console.log("No such document!");
      }
      for(let i = 0; i < tempAnswersArray.length; i++){
        if(tempAnswersArray[i].i === item.i){
          tempAnswersArray[i].l = tempAnswersArray[i].l + add;
          console.log(tempAnswersArray[i])
        }
      }
      await setDoc(doc(forumsRef, navigation.getParam('i')), { question: navigation.getParam('q'),
         description: navigation.getParam('d'), id: navigation.getParam('i'), answers: tempAnswersArray});
      readArray();
    }

    return(
        <SafeAreaView>
            <View style={styles.mainItem}>
                <Text style={styles.question}>{navigation.getParam('q')}</Text>
                <Text style={styles.desc}>{navigation.getParam('d')}</Text>
            </View>

            <FlatList
              keyExtractor={item => item.i}
              data={ansArr}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text style={styles.question}>{item.a}</Text>
                  <Text style={styles.desc}>Votes: {item.l}</Text>
                  <Button title='Like' onPress={() => likedAnswer(item, 1)}/>
                  <Button title='Dislike' onPress={() => likedAnswer(item, -1)}/>
                </View>
              )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeAnswer}
                  value={ans}
                  placeholder="Enter Answer Here"
                />
                <Button
                  onPress={create}
                  title="Post Answer"
                ></Button>
            </View>            

        </SafeAreaView>
    )
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
    item: {
      backgroundColor: '#68c7ed',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    mainItem: {
      backgroundColor: '#5d8ad4',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    question: {
      fontSize: 24,
    },
    desc: {
      fontSize: 16,
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