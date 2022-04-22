import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import Btn from "../components/Btn"
import Txt from "../components/TextBox"

export default function Answer({navigation}){
    const [ans, onChangeAnswer] = useState(null);
    const [ansArr, onChangeArray] = useState([]);

    const forumsRef = collection(db, "Forums");

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
      readArray();
    }, [])

    async function create() {
      if(!ans){
        alert("Please Enter An Answer");
      }
      else{
        var tempName = getRandomString(10);
        var tempArray = [...ansArr, {a: ans, i: tempName, l: [], t: 0}];
        await setDoc(doc(forumsRef, navigation.getParam('i')), { question: navigation.getParam('q'),
         description: navigation.getParam('d'), id: navigation.getParam('i'), answers: tempArray});
        alert("Your answer has been posted!");
        onChangeAnswer("");
        onChangeArray(tempArray)
      }
    }

    async function readArray() {
      const ref = doc(db, "Forums", navigation.getParam('i'))
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const post = docSnap.data();
        var tempAnswersArray = [...post.answers];
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
        tempAnswersArray = [...post.answers];
      } else {
        console.log("No such document!");
      }
      if (user !== null) {
        var uid = user.uid;
      }
      var tempLikesArray = [];
      var pos = 0;
      for(let i = 0; i < tempAnswersArray.length; i++){
        if(tempAnswersArray[i].i === item.i){
          tempLikesArray = tempAnswersArray[i].l;
          pos = i;
        }
      }
      var preLike = false;
      for(let i = 0; i < tempLikesArray.length; i++){
        if(tempLikesArray[i].uid == uid){
          if(tempLikesArray[i].like == add){
            preLike = true;
          }
          else if(tempLikesArray[i].like !== add){
            preLike = true;
            tempLikesArray[i].like = add;
          }
        }
      }
      if(!preLike){
        tempLikesArray.push({like: add, uid: uid})
      }
      var total = 0;
      for(let i = 0; i < tempLikesArray.length; i++){
        total += tempLikesArray[i].like;
      }
      tempAnswersArray[pos].t = total;
      
      await setDoc(doc(forumsRef, navigation.getParam('i')), { question: navigation.getParam('q'),
         description: navigation.getParam('d'), id: navigation.getParam('i'), answers: tempAnswersArray});
      readArray();
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.mainItem}>
                <Text style={styles.question}>{navigation.getParam('q')}</Text>
                <Text style={styles.desc}>{navigation.getParam('d')}</Text>
            </View>

            <FlatList
              keyExtractor={item => item.i}
              data={ansArr}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text style={styles.answer}>{item.a}</Text>
                  <Text style={styles.votes}>Votes: {item.t}</Text>
                  <TouchableOpacity onPress={() => likedAnswer(item, 1)}>
                    <Image
                      source={require('../assets/like.png')}
                      style={styles.buttonImageIconStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => likedAnswer(item, -1)}>
                    <Image
                      source={require('../assets/dislike.png')}
                      style={styles.buttonImageIconStyle}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={styles.inputContainer}>
                <Txt
                  onChangeText={onChangeAnswer}
                  value={ans}
                  placeholder="Enter Answer Here"
                />
                <Btn
                  onClick={() => create()}
                  title="Post Answer"
                ></Btn>
            </View>            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#536872',
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
    item: {
      backgroundColor: '#ededed',
      padding: 14,
      borderRadius: 15,
      borderColor: "#558099",
      borderWidth: 2,
      marginVertical: 10,
      marginHorizontal: 10,
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
    question: {
      fontSize: 24,
      fontFamily: "Helvetica Neue",
      color: "#f9f9f9"
    },
    answer: {
      fontSize: 24,
      fontFamily: "Helvetica Neue",
      color: "#375e94"
    },
    votes: {
      fontSize: 16,
      fontFamily: "Helvetica Neue",
      color: "#5CB85C"
    },
    desc: {
      fontSize: 14,
      fontFamily: "Helvetica",
      color: "#5cb85c"
    },
    buttonImageIconStyle: {
      padding: 15,
      margin: 5,
      height: 25,
      width: 25,
      flexDirection: 'row',
    },
    buttonFacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5,
      margin: 5,
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