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

  const [rightHand, setHandR] = useState(true);
  const [leftHand, setHandL] = useState(false);

  const [utr, onChangeUTR] = useState(0);

  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);

  const [range, setRange] = useState(5);

  return (
    <SafeAreaView style={styles.container}>

          <View style={styles.item}>
            <Checkbox.Item
              status={rightHand ? 'checked' : 'unchecked'}
              onPress={() => {
                setHandR(!rightHand);
              }}
              label="Righty"
              labelStyle={styles.text}
            />
            <Checkbox.Item
              status={leftHand ? 'checked' : 'unchecked'}
              onPress={() => {
                setHandL(!leftHand)
              }}
              label="Lefty"
              labelStyle={styles.text}
            />
          </View>

          <View style={styles.item}>
            <Checkbox.Item
              status={male ? 'checked' : 'unchecked'}
              onPress={() => {
                setMale(!male);
              }}
              label="Male"
              labelStyle={styles.text}
            />
            <Checkbox.Item
              status={female ? 'checked' : 'unchecked'}
              onPress={() => {
                setFemale(!female)
              }}
              label="Female"
              labelStyle={styles.text}
            />
          </View>

      <View style={styles.item}>
        <Text style={styles.text}>UTR: {utr} </Text>
          <Slider
            maximumValue={17}
            minimumValue={0}
            minimumTrackTintColor="#30B731"
            maximumTrackTintColor="#000000"
            step={1}
            value={utr}
            onValueChange={
              (oldVal) => {onChangeUTR(oldVal)}
            }
          />
      </View>

      <View style={styles.item}>
        <Text style={styles.text}>Distance: {range} miles</Text>
          <Slider
            maximumValue={20}
            minimumValue={1}
            minimumTrackTintColor="#30B731"
            maximumTrackTintColor="#000000"
            step={1}
            value={range}
            onValueChange={
              (oldVal) => {setRange(oldVal)}
            }
          />
      </View>

      <Btn
        style={styles.mainConatinerStyle}
        onClick = {() => navigation.navigate('Players', {handR: rightHand, handL: leftHand, UTR: utr, GenderF: female, GenderM: male})}
        title="Done"
      ></Btn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAD1D5',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    // fontFamily: "San-Fransisco",
    color: "#CAD1D5",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  },
  text2: {
    fontSize: 24,
    // fontFamily: "San-Fransisco",
    color: "#30B731",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
  },
  list: {
    flexDirection: "column",
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  objects: {
    backgroundColor: '#30B731',
    padding: 14,
    borderRadius: 15,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  separator: {
    marginVertical: 30,
    borderBottomColor: '#737373',
    borderBottomWidth: 2,
  },
 
floatingMenuButtonStyle: {
    width: 190,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left:'30%'
},
item: {
  backgroundColor: '#375e94',
  padding: 0,
  borderRadius: 10,
  borderColor: "#234261",
  borderWidth: 1,
  marginVertical: 20,
  marginHorizontal: 10,
},
mainConatinerStyle: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#30B731',
  width: '100%',
  marginVertical: 0,
}

});