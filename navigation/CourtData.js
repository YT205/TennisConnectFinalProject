import { StyleSheet, Text, View, Button, SafeAreaView, Switch } from 'react-native';
import { React, Component } from 'react';
import Slider from '@react-native-community/slider'
import { Checkbox } from 'react-native-paper';
import Btn from '../components/Btn';
import { ScrollView } from 'react-native-gesture-handler';

export default class Filter extends Component{
    constructor(props) {
      super(props);
      this.state = {
        distance: this.props.navigation.getParam('range', () => {}),
        count: this.props.navigation.getParam('numCourts', () => {}),
        type: this.props.navigation.getParam('type', () => {}),
        road: this.props.navigation.getParam('road', () => {}),
        material: this.checkMaterial(),
        area: this.checkArea(),
        shop: this.checkProshop(),
        lights: this.checkLight(),
      };
    }

    checkMaterial = () => {
        if(this.props.navigation.getParam('clay')){
          return "Clay";
        }
        else if(this.props.navigation.getParam('grass')){
          return "Grass";
        }
        else{
          return "Hardcourt";
        }
    }

    checkArea = () => {
      if(this.props.navigation.getParam('indoor')){
        return "Indoor";
      }
      else{
        return "Outdoor"
      }
    }

    checkProshop = () => {
      if(this.props.navigation.getParam('proshop')){
        return "Yes";
      }
      else{
        return "No"
      }
    }

    checkLight = () => {
      if(this.props.navigation.getParam('lights')){
        return "Yes";
      }
      else{
        return "No"
      }
    }

    render(){
      return (
        <ScrollView style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.text}>Road: {this.state.road}</Text>   
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Distance: {this.state.distance} miles</Text>   
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Lights: {this.state.lights}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Number of Courts: {this.state.count}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Type: {this.state.type}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Material: {this.state.material}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Area: {this.state.area}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.text}>Proshop: {this.state.shop}</Text>
            </View>

        </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5d7eb',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Helvetica Neue",
    color: "#f0f0f0"
  },
  text2: {
    fontSize: 24,
    fontFamily: "Helvetica",
    color: "#142033"
  },
  item: {
    backgroundColor: '#375e94',
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  itemSlider: {
    backgroundColor: '#375e94',
    padding: 10,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  itemSwitch: {
    backgroundColor: '#375e94',
    padding: 10,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
});
