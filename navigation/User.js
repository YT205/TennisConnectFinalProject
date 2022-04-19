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
      <SafeAreaView style={styles.container}>
        <View style={styles.mainItem}>
          <Text style={styles.name}>{navigation.getParam('name')}</Text>
        </View>
        <Separator/>
        <View style={styles.item}>
          <Text style={styles.desc}>UTR: {navigation.getParam('utr')}</Text>
          <Text style={styles.desc}>Age: {navigation.getParam('age')}</Text>
          <Text style={styles.desc}>Gender: {navigation.getParam('gender')}</Text>
          <Text style={styles.desc}>Contact Info: {navigation.getParam('contact')}</Text>
        </View> 
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5CB85C',
      alignItems: 'center',
      justifyContent: 'center',
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
      fontSize: 32,
      fontFamily: "Helvetica Neue",
      color: "#e6e6e6"
    },
    desc: {
      fontSize: 24,
      fontFamily: "Helvetica Neue",
      color: "#e6e6e6"
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: 2,
    },
  });