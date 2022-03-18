import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from "react-native"
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';
import * as Location from 'expo-location'

import {tennisCourts} from "../assets/courts.json";
import * as data from "../assets/courtShort.json";

let apiKey = 'AIzaSyDUipSL9QVWpu4-z3oV6NvHcdbGILaDKhw';

export default class Maps extends Component{
  constructor(props) {
    super(props);
    this.state = {
      courts: [],
      latitude: null,
      longitude: null,
      errorMsg: null,
    };
  }

  componentDidMount(){
    // if(this.state.latitude == null){
    //   this.getLocation();
    // }
    var tempArr = [];
    data.courtData.map((item) => {
      tempArr.push({name: item.name, description: item.description, latitude: item.latitude, longitude: item.longitude})
      // console.log(item.name + ": " + this.checkDistance(item.latitude, item.longitude))
    })
    this.setState({courts: [...tempArr]})
  }

  getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(apiKey);
      let { coords } = await Location.getCurrentPositionAsync();
      this.setState({longitude: coords.longitude, latitude: coords.latitude});
      // console.log(coords);
    })();
  };

  checkDistance = (lat, long) => {
    // console.log(this.state.latitude + " + " + this.state.longitude)
    var latDif = lat - this.state.latitude;
    var longDif = long - this.state.longitude;
    latDif = Math.abs(latDif);
    longDif = Math.abs(longDif);
    var a = latDif * latDif;
    var b = longDif * longDif;
    var c = a + b;
    c = Math.sqrt(c);
    // c = c * 69;
    return c;
  }

  mapMarkers = () => {
    return this.state.courts.map((court, key) => <Marker
      key={key}
      coordinate={{ latitude: court.latitude, longitude: court.longitude }}
      title={court.name}
      description={court.address}
    >
    </Marker >)
  }

  render(){
    return(
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={{
          latitude: 37,
          longitude: -97,
          latitudeDelta: 75,
          longitudeDelta: 75
        }}
      >
      {this.mapMarkers()}
      </MapView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#68c7ed',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});