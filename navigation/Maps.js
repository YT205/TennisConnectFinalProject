import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from "react-native"
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';

import {tennisCourts} from "../assets/courts.json";
import * as data from "../assets/courtShort.json";


export default class Maps extends Component{
  constructor(props) {
    super(props);
    this.state = {
      courts: [],
      error: ""
    };
  }

  componentDidMount(){
    var tempArr = [];
    data.courtData.map((item) => {
      tempArr.push({name: item.name, description: item.description, latitude: item.latitude, longitude: item.longitude})
    })
    this.setState({courts: [...tempArr]})
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
          latitudeDelta: 1,
          longitudeDelta: 1
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