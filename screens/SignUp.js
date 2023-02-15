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
        width: "100%",
        backgroundColor: "#CAD1D5",
        justifyContent: "center",
        alignItems: "center"
    },
    smolButton: {
        fontSize: 16,
        color: "#02021c"
    },
})

export default function SignUpScreen({ navigation }) {

    const [values, setValues] = useState({
        email: "",
        pwd: "",
        pwd2: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function SignUp() {

        const { email, pwd, pwd2 } = values

        if (pwd == pwd2) {
            firebase.auth().createUserWithEmailAndPassword(email, pwd)
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message)
                });
        } else {
            alert("Passwords are different!")
        }
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 90 }}>Tennis Connect</Text>
        <Text style={{ fontSize: 34, fontWeight: "400", marginBottom: 20 }}>Sign Up</Text>
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} placeholderTextColor={"black"}/>
        <TextBox placeholder="Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")} placeholderTextColor={"black"}/>
        <TextBox placeholder="Confirm Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")} placeholderTextColor={"black"}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Sign Up" style={{ width: "100%" }} />
        </View>
        <View style={{marginVertical: 25}}>
            <Text style={styles.smolButton}>Already have an account? <Text onPress={() => navigation.replace("Login")} 
                style={{textDecorationLine: 'underline'}}>Login</Text></Text>
        </View>
    </View>
}