import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { React, useEffect, useState, useCallback } from 'react';
import { db } from "./Firebase";
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
  const [postArray, onChangeArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(search.length == 0){
      readNames();
    }
    searchWord(search);
  }, [search])

  async function readNames() {
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
    setRefreshing(false);
  }

  function searchWord(word){ 
    var tempArr = [];
    var tempWord
    for(var i = 0; i < postArray.length; i++){
      tempWord = postArray[i].q.toLowerCase()
      if(tempWord.indexOf(word.toLowerCase()) !== -1){
        tempArr.push(postArray[i]);
      }
    }
    onChangeArray(tempArr);
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    readNames();
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <Txt
        onChangeText={setSearch}
        value={search}
        placeholder="Enter Search Here"
      />
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />

      <Btn
        style={styles.buttonsContainer}
        onClick={() => navigation.navigate('Post')}
        color="#2145a6"
        title="Post Question"
      ></Btn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAD1D5',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: "#f0f0f0"
  },
  desc: {
    fontSize: 14,
    color: "#b8bab9"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#283340',
    borderBottomWidth: 2,
  },
  item: {
    backgroundColor: '#0F497B',
    padding: 14,
    borderRadius: 15,
    borderColor: "#CAD1D5",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 4,
  }
});