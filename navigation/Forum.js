import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import Btn from "../components/Btn"
import Txt from "../components/TextBox"

class Post {
  constructor(question, description, id) {
    this.question = question;
    this.description = description;
    this.id = id;
  }
}

export default function Forum({ navigation }) {
  var questionName = "";

  const [quest, onChangeQuestion] = useState(null);
  const [desc, onChangeDesc] = useState(null);
  const [postArray, onChangeArray] = useState([]);

  const forumsRef = collection(db, "Forums");

  useEffect(() => {
    ReadNames();
  }, [])

  async function Create() {
    if(!quest){
      alert("Please Enter a Question");
    }
    else if(!desc){
      alert("Please Enter a Description");
    }
    else{
      questionName = getRandomString(10);
      await setDoc(doc(forumsRef, questionName), {question: quest, description: desc, id: questionName, answers: []});
      onChangeQuestion("");
      onChangeDesc("");
      alert("Your question has been posted!")
      ReadNames();
    }
  }

  async function ReadNames() {
    const querySnapshot = await getDocs(collection(db, "Forums"));
    const tempNames = []
    querySnapshot.forEach((doc) => {
      tempNames.push(doc.id);
    });

    var tempQuestionsArray = []
    tempNames.forEach(async (name) => {
      const ref = doc(db, "Forums", name).withConverter(questionConverter);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const post = docSnap.data();
        tempQuestionsArray.push({q: post.question, d: post.description, i: post.id})
      } else {
        console.log("No such document!");
      }
      onChangeArray(tempQuestionsArray);
    })
  }

  const questionConverter = {
    toFirestore: (post) => {
      return {
        question: post.question,
        description: post.description,
        id: post.id
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Post(data.question, data.description, data.id);
    }
  };

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.i}
          data={postArray}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => navigation.navigate('Answer', item)}>
                <Text style={styles.quest}>{item.q}</Text>
                <Text style={styles.desc}>{item.d}</Text>
              </TouchableOpacity>
            </View>
          )}
      />
      <Separator/>
      
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
          onClick={() => Create()}
          color="#2145a6"
          title="Post Question"
        ></Btn>
      </View>
    </SafeAreaView>
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
  quest: {
    fontSize: 24,
  },
  desc: {
    fontSize: 12,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: 2,
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