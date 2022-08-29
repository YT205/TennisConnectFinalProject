import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity, FlatList, Switch, ScrollView } from 'react-native';
import { React, useEffect, useState } from 'react';
import Btn from "../components/Btn"
import Txt from "../components/TextBox"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth'
import { setDoc, collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from "./Firebase";
import * as Location from 'expo-location'
import DatePicker from 'react-native-modern-datepicker';
import { Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

export default function editAccount() {
    const [utr, onChangeUTR] = useState(null);
    const [contact, onChangePhone] = useState(null);
    const [gender, onChangeGender] = useState(null);
    const [name, onChangeName] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [note, onChangeNote] = useState(null);
    const [rightHand, setHand] = useState(null);
    const [lat, onChangeLat] = useState(null);
    const [lon, onChangeLon] = useState(null);
    const [sendLoc, onChangeSend] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();

    const auth = getAuth();
    const user = auth.currentUser;
    const usersRef = collection(db, "Users");

    const apiKey = 'AIzaSyDUipSL9QVWpu4-z3oV6NvHcdbGILaDKhw';
  
    useEffect(() => {
      getLocation();
    }, [])

    async function Create() {
        const uid = user.uid;
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        
        // console.log(selectedDate.getFullYear())

        console.log(currentDay + " " + currentMonth + " " + currentYear)
        if(!utr){
          alert("Please Enter a UTR");
        }
        else if(!contact){
          alert("Please Enter a contact");
        }
        else if(!gender){
          alert("Please Enter a Gender");
        }
        else if(!name){
          alert("Please Enter a Name");
        }
        else{
          if(sendLoc){
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, contact: contact, gender: gender, name: name, 
              uid: uid, latitude: lat, longitude: lon});
          }
          else{
            await setDoc(doc(usersRef, uid), {age: age, utr: utr, contact: contact, gender: gender, name: name, 
              uid: uid, email: email, note: note, rightHand: rightHand, latitude: null, longitude: null});
          }
          onChangeUTR("");
          onChangePhone("");
          onChangeGender("");
          onChangeName("");
          onChangeEmail("");
          onChangeNote("");
          alert("Your info has been posted!")
        }
    }

    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(apiKey);
      let { coords } = await Location.getCurrentPositionAsync();
      onChangeLat(coords.latitude);
      onChangeLon(coords.longitude);
    }

  var optionsDate =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
    "17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  var optionsMonth =["1","2","3","4","5","6","7","8","9","10","11","12"];
  // function createYears(){
  //   const year = new Date().getFullYear();
  //   var tempArray = [];
  //   for(x = 1950; x <= year; x++){
  //     tempArray.push(x);
  //   }
  //   setYears(tempArray);
  // }
  // yearPicker = () => {
  //   return  => 
  //     <Picker.item
  //       label={item} value={index} key={index}
  //     />
  //   )
  // }

  return (
    <View style = {styles.container}>
      <ScrollView>
            <Text style = {styles.item1}>
            
            </Text>

            <View 
              style = {styles.item2}>
              <Picker
                  selectedValue={selectedDate}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedDate(itemValue)
                  }>
                  {optionsDate.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>) 
                  })}
              </Picker>
              <Picker
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedMonth(itemValue)
                  }>
                  {optionsMonth.map((item, index) => {
                    return (<Picker.Item label={item} value={index} key={index}/>) 
                  })}
              </Picker>
              <Picker
                  selectedValue={selectedYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedYear(itemValue)
                  }>
                  {}
              </Picker>
            </View>
            
            <Txt
              onChangeText={onChangeUTR}
              value={utr}
              placeholder="Enter UTR Here"
            />
            <Txt
              onChangeText={onChangePhone}
              value={contact}
              placeholder="Enter Phone Here"
            />
            <Txt
              onChangeText={onChangeName}
              value={name}
              placeholder="Enter Name Here"
            />
            <Txt
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Optional Email Here"
            />
            <Txt
              onChangeText={onChangeNote}
              value={note}
              placeholder="Enter a Note for Other Users to Contact You"
            />     

            <View 
              style = {styles.item2}>
              <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) =>
                    onChangeGender(itemValue)
                  }>
                  <Picker.Item label="" value="None" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            <View 
              style = {styles.item2}>
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

            <View style={styles.itemSwitch}>
              <Text style={styles.text}>Use Location: </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#30B731" }}
                thumbColor={sendLoc ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={
                  (oldVal) => {onChangeSend(oldVal)}
                }
                value={sendLoc}
              />
            </View>

      <Btn
        style={styles.buttonsContainer}
        onClick={() => Create()}
        color="#2145a6"
        title="Update Information"
      ></Btn>
            

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAD1D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll:{
    flex: 1
  },
  text2: {
    fontSize: 24,
    fontFamily: "Optima",
    // backgroundColor: "#30B731",
    textDecorationLine: 'underline'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30B731',
    width: '90%',
    marginVertical: 10,
  },
  floatingMenuButtonStyle: {
    width: 90,
    height: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 50,
    backgroundColor: '#30B731',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#30B731',
  },
  input2: {
    justifyContent: 'flex-end',
    height: 90,
    width: 250,
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
  item1: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: '#CAD1D5',
    padding: 0,
    borderRadius: 10,
    borderColor: "#CAD1D5",
    borderWidth: 1,
    marginVertical: 4,
    height:140,
    marginHorizontal: 10,
  },
  quest: {
    fontSize: 24,
  },
  desc: {
    fontSize: 12,
  },
  text: {
    fontSize: 24,
    color: "#f0f0f0"
  },
  itemSwitch: {
    backgroundColor: '#0F497B',
    padding: 10,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});