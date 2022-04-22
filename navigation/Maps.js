import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from "react-native"
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';
import * as Location from 'expo-location'
import Btn from '../components/Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as data from "../assets/courts.json";

let apiKey = 'AIzaSyDUipSL9QVWpu4-z3oV6NvHcdbGILaDKhw';

export default class Maps extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      courts: [],
      latitude: null,
      longitude: null,
      range: 5,
      numCourts: 1,
      lights: false,
      typePublic: true,
      typePrivate: true,
      proshop: false,
      clay: false,
      grass: false,
      indoor: false,
    };
  }

  receivedValue = (range, numCourts, lights, typePublic, typePrivate, proshop, clay, grass, indoor) => {
    this.setState({range})
    this.setState({numCourts})
    this.setState({lights})
    this.setState({typePublic})
    this.setState({typePrivate})
    this.setState({proshop})
    this.setState({clay})
    this.setState({grass})
    this.setState({indoor})
  }

  componentDidMount(){
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState){
    if (
      prevState.range !== this.state.range || prevState.numCourts !== this.state.numCourts || prevState.lights !== this.state.lights || 
      prevState.typePublic !== this.state.typePublic || prevState.typePrivate !== this.state.typePrivate || prevState.proshop !== this.state.proshop || 
      prevState.clay !== this.state.clay || prevState.grass !== this.state.grass || prevState.indoor !== this.state.indoor
      ) {
      this.setState({courts: []}, () => {
        this.pushCourts();
      }); 
    }
  }

  getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(apiKey);
      let { coords } = await Location.getCurrentPositionAsync();
      this.setState({longitude: coords.longitude, latitude: coords.latitude}, () => {
        this.pushCourts();
      });
    })();
  };

  pushCourts = () => {
    var tempArr = [];
    data.courtData.map((item) => {
      if(
        this.checkDistance(item.latitude, item.longitude) < this.state.range && item.count >= this.state.numCourts && 
        item.lights == this.state.lights && item.proshop == this.state.proshop && item.clay == this.state.clay && item.grass == this.state.grass &&
        this.typeChecker(item.type, this.state.typePublic, this.state.typePrivate) && item.indoor == this.state.indoor
       ){
        tempArr.push({
          name: item.name,
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude,
          courts: item.count,
          lights: item.lights,
          info: item.address,
          type: item.type,
          shop: item.proshop,
          clay: item.clay,
          grass: item.grass,
          indoor: item.indoor,
        })
      }
    })
    this.setState({courts: [...tempArr]})
  };

  typeChecker = (type, b1, b2) => {
    if(type == "Public" && b1){
      return true;
    }
    else if(type == "Homeowners Community" && b2){
      return true;
    }
    return false;
  }

  checkDistance = (lat, lon) => {
    var lat1 = lat / 57.29577951;
    var lon1 = lon / 57.29577951;
    var lat2 = this.state.latitude / 57.29577951;
    var lon2 = this.state.longitude / 57.29577951;

    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    dlat = Math.abs(dlat);
    dlon = Math.abs(dlon);

    var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var r = 3956;
    var d = c * r;
    d = d * 10;
    d = Math.round(d);
    d = d / 10;

    return d;
  }

  markerPress = async (court) => {
    try {
      const value = await AsyncStorage.getItem('court')
      if(value !== null) {
        if(value == court.name){
          this.props.navigation.navigate('Info', {
            range: this.checkDistance(court.latitude, court.longitude),
            numCourts: court.courts,
            lights: court.lights,
            type: court.type,
            proshop: court.proshop,
            clay: court.clay,
            grass: court.grass,
            indoor: court.indoor,
            road: court.address,
          })
        }
        else{
          try {
            await AsyncStorage.setItem('court', court.name)
          } catch (e) {
            console.log(e);
          }
        }
      }
      else{
        try {
          await AsyncStorage.setItem('court', court.name)
        } catch (e) {
          console.log(e);
        }
      }
    } catch(e) {
      console.log(e);
    }
    
  }

  mapMarkers = () => {
    return this.state.courts.map((court, key) => 
      <Marker
        key={key}
        coordinate={{ latitude: court.latitude, longitude: court.longitude }}
        title={court.name}
        description={court.info}
        onPress={() => 
          this.markerPress(court)
        }
      >
      </Marker >
    )
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: 42.04,
            longitude: -88.1,
            latitudeDelta: 1,
            longitudeDelta: 1
          }}
        >
          {this.mapMarkers()}
        </MapView>
        
        <View style={styles.button}>
          <Btn
            color="#2145a6"
            title="Filter"
            onClick={() => this.props.navigation.navigate('Filters', {
              receivedValue: this.receivedValue,
              range: this.state.range,
              numCourts: this.state.numCourts,
              lights: this.state.lights,
              typePublic: this.state.typePublic,
              typePrivate: this.state.typePrivate,
              proshop: this.state.proshop,
              clay: this.state.clay,
              grass: this.state.grass,
              indoor: this.state.indoor
            })}
          />
        </View>
      </SafeAreaView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
    top: 0,
    bottom: 0
  },
  button: {
    position: 'absolute',
    top: '87%',
    alignSelf: 'flex-end',
    padding: 10,
    width: 100,
  }
});