import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#CAD1D5",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function Loginscreen({ navigation }) {

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Login() {

        const { email, pwd } = values

        firebase.auth().signInWithEmailAndPassword(email, pwd)
            .then(() => {
            })
            .catch((error) => {
                alert(error.message)
                // ..
            });
    }

    return <View style={styles.view}>
         <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 90 }}>Tennis Connect</Text>
        <Text style={{ fontSize: 34, fontWeight: "400", marginBottom: 20 }}>Login</Text>
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
            <Btn onClick={() => navigation.navigate("Sign Up")} title="Sign Up" style={{ width: "48%", color: "black" }} />
        </View>
    </View>
}