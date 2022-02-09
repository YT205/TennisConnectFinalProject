import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet } from "react-native";
import MapPage from "./MapPage";


const Maps = ({navigation}) => {
  return (
    <SafeAreaView forceInset={{top: 'always' }}>
      <MapPage/>
    </SafeAreaView>
  )
}

export default Maps