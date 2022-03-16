import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

export default function Answer({navigation}){
    const Separator = () => (
      <View style={styles.separator} />
    );

    return(
      <SafeAreaView>
        <View style={styles.mainItem}>
          <Text style={styles.question}>{navigation.getParam('name')}</Text>
        </View>
        <Separator/>
        <View>
          <Text style={styles.desc}>{navigation.getParam('utr')}</Text>
          <Text style={styles.desc}>{navigation.getParam('age')}</Text>
          <Text style={styles.desc}>{navigation.getParam('gender')}</Text>
          <Text style={styles.desc}>{navigation.getParam('contact')}</Text>
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
    mainItem: {
      backgroundColor: '#5d8ad4',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    question: {
      fontSize: 32,
    },
    desc: {
      fontSize: 24,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: 2,
    },
  });