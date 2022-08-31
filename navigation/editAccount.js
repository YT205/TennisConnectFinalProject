import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Switch,
  ScrollView,
  Button,
  Picker,
} from "react-native";
import { React, useEffect, useState } from "react";
import Txt from "../components/TextBox";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { setDoc, collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import * as Location from "expo-location";
import { Checkbox } from "react-native-paper";
// import { Picker } from "@react-native-picker/picker";
import UpdateButton from "react-native-really-awesome-button/src/themes/blue";

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
  
  const auth = getAuth();
  const user = auth.currentUser;
  const usersRef = collection(db, "Users");

  const apiKey = "AIzaSyDUipSL9QVWpu4-z3oV6NvHcdbGILaDKhw";

  useEffect(() => {
    getLocation();
  }, []);


  async function Create() {
    const uid = user.uid;
    if (!utr) {
      alert("Please Enter a UTR");
    } else if (!contact) {
      alert("Please Enter a contact");
    } else if (!gender) {
      alert("Please Enter a Gender");
    } else if (!name) {
      alert("Please Enter a Name");
    } else {
      if (sendLoc) {
        await setDoc(doc(usersRef, uid), {
          age: age,
          utr: utr,
          contact: contact,
          gender: gender,
          name: name,
          uid: uid,
          latitude: lat,
          longitude: lon,
        });
      } else {
        await setDoc(doc(usersRef, uid), {
          age: age,
          utr: utr,
          contact: contact,
          gender: gender,
          name: name,
          uid: uid,
          email: email,
          note: note,
          rightHand: rightHand,
          latitude: null,
          longitude: null,
        });
      }
      onChangeUTR("");
      onChangePhone("");
      onChangeGender("");
      onChangeName("");
      onChangeEmail("");
      onChangeNote("");
      alert("Your info has been posted!");
    }
  }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    Location.setGoogleApiKey(apiKey);
    let { coords } = await Location.getCurrentPositionAsync();
    onChangeLat(coords.latitude);
    onChangeLon(coords.longitude);
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUTR}
          value={utr}
          placeholder="Enter UTR Here"
          placeholderTextColor={"black"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={contact}
          placeholder="Enter Phone Here"
          placeholderTextColor={"black"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Enter Name Here"
          placeholderTextColor={"black"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Optional Email Here"
          placeholderTextColor={"black"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Enter a Note"
          placeholderTextColor={"black"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNote}
          value={note}
          placeholder="Enter a Note"
          placeholderTextColor={"black"}
        />
      </View>

      <View style={styles.pickerSpace}>
        <Picker
          selectedValue={gender}
          style={{ height: 50, width: 350 }}
          onValueChange={(itemValue, itemIndex) => onChangeGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <Picker
          selectedValue={rightHand}
          onValueChange={(itemValue, itemIndex) => setHand(itemValue)}
          style={{ height: 50, width: 350, marginTop: 150, marginBottom: 250 }}
        >
          <Picker.Item label="Right" value="Right" />
          <Picker.Item label="Left" value="Left" />
        </Picker>
      </View>

      <View style={styles.basic}>
        <View style={styles.switchContainer}>
          <Text style={styles.text}>Use Location: </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#30B731" }}
            thumbColor={sendLoc ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(oldVal) => {
              onChangeSend(oldVal);
            }}
            value={sendLoc}
          />
        </View>
      </View>

      {/* <View style={styles.basic}> */}
      <UpdateButton
        type="primary"
        progress
        onPress={() => Create()}
        borderColor="green"
        borderWidth={2}
        progressLoadingTime={1000}
        width={450}
        height={80}
        textSize={20}
      >
        Update Information
      </UpdateButton>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#c5d7eb",
    // backgroundColor: "#f194ff",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 600,
  },

  basic: {
    marginBottom: 70,
    // marginTop: 50,
    // backgroundColor: "#f194ff",
    alignItems: "center",
    // justifyContent: "space-evenly",
  },

  spacedOut: {
    alignItems: "center",
    // backgroundColor: "#4B8A08",
    // marginTop: 30,
    marginBottom: 250,
    // justifyContent: "space-evenly",
  },
  spacedOut2: {
    alignItems: "center",
    // backgroundColor: "#4B8A08",
    position: "absolute",
    // left: 0,
    // right: 10,
    bottom: 400,
    // marginTop: 30,
    // marginBottom: 750,
    // justifyContent: "space-evenly",
  },
  pickerSpace: {
    alignItems: "center",
    // marginBottom: 150,
    // backgroundColor: "#f194ff",
    // justifyContent: "space-evenly",
  },

  input: {
    height: 40,
    width: 350,
    borderWidth: 2,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  buttonsContainer: {
    height: 250,
    width: 450,
    backgroundColor: "green",
  },

  inputContainer: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 50,
    backgroundColor: "#30B731",
  },

  text: {
    color: "white",
    fontSize: 20,
  },

  itemSwitch: {
    backgroundColor: "#0F497B",
    padding: 10,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    // width: 150,
  },
  switchContainer: {
    backgroundColor: "#0F497B",
    width: 250,
    borderRadius: 10,
    borderColor: "#4B8A08",
    borderWidth: 2,
    alignItems: "center",
  },
});
