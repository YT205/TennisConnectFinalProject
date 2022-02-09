import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as React from 'react';


export default function Maps() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });


// export default function Maps() {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome to the Court Maps!</Text>
//       <MapView style={styles.map} />
//       <StatusBar style="auto" />
//     </View>


//   );
// }

