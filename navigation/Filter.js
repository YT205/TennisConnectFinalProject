import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { React, Component } from 'react';
import Slider from '@react-native-community/slider'
import { Checkbox } from 'react-native-paper';
import Btn from '../components/Btn';

export default class Filter extends Component{
    constructor(props) {
      super(props);
      this.state = {
        checkLights: false,
        sliderRange: 5,
        sliderCount: 1,
      };
    }

    render(){
      const receivedValue = this.props.navigation.getParam('receivedValue', () => {});
      const range = this.props.navigation.getParam('range', () => {});
      const numCourts = this.props.navigation.getParam('numCourts', () => {});
      const lights = this.props.navigation.getParam('lights', () => {});
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.item}>
            <Checkbox.Item
              status={this.state.checkLights ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checkLights: !this.state.checkLights});
              }}
              label="Lights"
              labelStyle={styles.text}
            />
          </View>
            
          <View style={styles.itemS}>
            <Text style={styles.text}>Distance: {this.state.sliderRange} miles</Text>
            <Slider
                maximumValue={20}
                minimumValue={1}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
                step={1}
                value={this.state.sliderRange}
                onValueChange={
                  (oldVal) => {this.setState({sliderRange: oldVal})}
                }
            />
          </View>

          <View style={styles.itemS}>
            <Text style={styles.text}>Number of Courts: {this.state.sliderCount}</Text>
            <Slider
                maximumValue={8}
                minimumValue={1}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
                step={1}
                value={this.state.sliderCount}
                onValueChange={
                  (oldVal) => {this.setState({sliderCount: oldVal})}
                }
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Btn
              onClick={() => {
                if(this.state.sliderRange !== range || this.state.sliderCount !== numCourts || this.state.checkLights !== lights){
                  receivedValue(this.state.sliderRange, this.state.sliderCount, this.state.checkLights)
                }
                this.props.navigation.navigate('Map')
              }}
              title="Set Filters"
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
    padding: 0,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  itemS: {
    backgroundColor: '#375e94',
    padding: 10,
    borderRadius: 10,
    borderColor: "#234261",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
