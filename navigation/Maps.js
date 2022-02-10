import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

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
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }}>
        <Marker
          coordinate = {{
          latitude: 42.0166211,
          longitude: -88.0741795,
          }}
          description = {'2 Courts, Lights Available'}
          title = {'Meineke Recreation Center'}>
          
        </Marker>

        <Marker
          coordinate = {{
          latitude: 42.0035238,
          longitude: -88.0084918,
          }}
          description = {'2 Courts, Lights Available'}
          title = {'Clark Park'}>
          
        </Marker>

        <Marker
          coordinate = {{
          latitude: 42.033988,
          longitude: -88.050479,
          }}
          description = {'2 Courts, No Lights Available'}
          title = {'Park St Claire'}>
          
        </Marker>

        <Marker
          coordinate = {{
          latitude: 42.0312903,
          longitude: -88.119026,
          }}
          description = {'2 Courts, No Lights Available'}
          title = {'Hoover Park'}>
          
        </Marker>

        <Marker
          coordinate = {{
          latitude: 42.0061832,
          longitude: -88.0572353,
          }}
          description = {'2 Courts, No Lights Available'}
          title = {'Kingsport East Courts'}>
          
        </Marker>

        <Marker
          coordinate = {{
          latitude: 42.0010683,
          longitude: -88.0689048,
          }}
          description = {'1 Court, No Lights Available'}
          title = {'Sunset Park'}>
          
        </Marker>

      </MapView>
  );
}

    // <SafeAreaView forceInset={{top: 'always' }}>
    //   <MapPage/>
    // </SafeAreaView>

// export default Maps