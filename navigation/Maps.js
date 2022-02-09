import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// import MapPage from "./MapPage";
// import { SafeAreaView } from "react-navigation";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Maps() {
  return (
    <View style={styles.container}>
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      />
    </View>
    
  );
}

    // <SafeAreaView forceInset={{top: 'always' }}>
    //   <MapPage/>
    // </SafeAreaView>

// export default Maps