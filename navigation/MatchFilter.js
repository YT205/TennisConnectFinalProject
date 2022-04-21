import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { React, useEffect, useState } from 'react';
import { db } from "../Firebase";
import { setDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Btn from '../components/Btn';
import { Checkbox } from 'react-native-paper';
import Txt from "../components/TextBox"
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider'

export default function MatchFilter({ navigation }) {

  const [rightHand, setHand] = useState('');
  const [utr, onChangeUTR] = useState(0);
  const [gender, setGender] = useState('');
  const [range, setRange] = useState(5);

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.item}>
            {/* <Checkbox.Item
              status={rightHand ? 'checked' : 'unchecked'}
              onPress={() => {
                setHand(!rightHand);
              }}
              label="Right Hand"
              labelStyle={styles.text}
            /> */}
        <Picker
          selectedValue={rightHand}
          onValueChange={(itemValue, itemIndex) =>
            setHand(itemValue)
          }>
          <Picker.Item label="" value="None" />
          <Picker.Item label="Right" value="Right" />
          <Picker.Item label="Left" value="Left" />
        </Picker>
      </View>

      <View style = {styles.separator}/>
        <View>
          <Txt
          onChangeText={onChangeUTR}
          value={utr}
          placeholder="Enter UTR Here"
          />               
      </View>

      <View style = {styles.separator}/>

      <View>
        <Text style = {styles.text2}>
          Gender Preference:
        </Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) =>
            setGender(itemValue)
          }
        >
        <Picker.Item label="" value="None" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style = {styles.separator}/>

      <View style = {styles.mainConatinerStyle}>
        <Btn onClick={() => navigation.navigate('Players', {hand: rightHand, UTR: utr, Gender: gender})} 
          title="Done"
          style={styles.floatingMenuButtonStyle}
        />
      </View>

      <View style={styles.itemSlider}>
        <Text style={styles.text}>Distance: {range} miles</Text>
          <Slider
            maximumValue={20}
            minimumValue={1}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={range}
            onValueChange={
              (oldVal) => {setRange(oldVal)}
            }
          />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "white"
  },
  text2: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "blue",
    textDecorationLine: 'underline'
  },
  list: {
    flexDirection: "column",
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  objects: {
    backgroundColor: '#375e94',
    padding: 14,
    borderRadius: 15,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
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
    width: 190,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 150,
    left:'30%'
},
item: {
  backgroundColor: '#375e94',
  padding: 0,
  borderRadius: 10,
  borderColor: "#234261",
  borderWidth: 1,
  marginVertical: 10,
  marginHorizontal: 10,
},

});