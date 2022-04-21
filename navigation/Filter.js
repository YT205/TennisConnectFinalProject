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
        checkLights: this.props.navigation.getParam('lights', () => {}),
        sliderRange: this.props.navigation.getParam('range', () => {}),
        sliderCount: this.props.navigation.getParam('numCourts', () => {}),
        courtPub: this.props.navigation.getParam('typePublic', () => {}),
        courtPri: this.props.navigation.getParam('typePrivate', () => {}),
        checkProshop: this.props.navigation.getParam('proshop', () => {}),
        checkClay: this.props.navigation.getParam('clay', () => {}),
        checkGrass: this.props.navigation.getParam('grass', () => {}),
        checkIndoor: this.props.navigation.getParam('indoor', () => {})
      };
    }

    render(){
      
      const receivedValue = this.props.navigation.getParam('receivedValue', () => {});
      const range = this.props.navigation.getParam('range', () => {});
      const numCourts = this.props.navigation.getParam('numCourts', () => {});
      const lights = this.props.navigation.getParam('lights', () => {});
      const typePublic = this.props.navigation.getParam('typePublic', () => {});
      const typePrivate = this.props.navigation.getParam('typePrivate', () => {});
      const proshop = this.props.navigation.getParam('proshop', () => {});
      const clay = this.props.navigation.getParam('clay', () => {});
      const grass = this.props.navigation.getParam('grass', () => {});
      const indoor = this.props.navigation.getParam('indoor', () => {});

      return (
        <ScrollView style={styles.container}>
          <View style={styles.item}>
            <Checkbox.Item
              status={this.state.courtPub ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({courtPub: !this.state.courtPub});
              }}
              label="Public"
              labelStyle={styles.text}
            />
            <Checkbox.Item
              status={this.state.courtPri ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({courtPri: !this.state.courtPri});
              }}
              label="Private"
              labelStyle={styles.text}
            />
          </View>

          <View style={styles.item}>
            <Checkbox.Item
              status={this.state.checkClay ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checkClay: !this.state.checkClay});
              }}
              label="Clay"
              labelStyle={styles.text}
            />
            <Checkbox.Item
              status={this.state.checkGrass ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checkGrass: !this.state.checkGrass});
              }}
              label="Grass"
              labelStyle={styles.text}
            />
          </View>

          <View style={styles.itemSwitch}>
            <Text style={styles.text}>Lights: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.checkLights ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={
                (oldVal) => {this.setState({checkLights: oldVal})}
              }
              value={this.state.checkLights}
            />
          </View>

          <View style={styles.itemSwitch}>
            <Text style={styles.text}>Indoor: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.checkIndoor ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={
                (oldVal) => {this.setState({checkIndoor: oldVal})}
              }
              value={this.state.checkIndoor}
            />
          </View>

          <View style={styles.itemSwitch}>
            <Text style={styles.text}>Proshop: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={this.state.checkProshop ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={
                (oldVal) => {this.setState({checkProshop: oldVal})}
              }
              value={this.state.checkProshop}
            />
          </View>

          <View style={styles.itemSlider}>
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

          <View style={styles.itemSlider}>
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
                if(
                  this.state.sliderRange !== range || this.state.sliderCount !== numCourts || this.state.checkLights !== lights || 
                  this.state.courtPub !== typePublic || this.state.courtPri !== typePrivate || this.state.checkProshop !== proshop ||
                  this.state.checkGrass !== grass || this.state.checkClay !== clay || this.state.checkIndoor !== indoor
                  ){
                  receivedValue(this.state.sliderRange, this.state.sliderCount, this.state.checkLights, this.state.courtPub,
                     this.state.courtPri, this.state.checkProshop, this.state.checkClay, this.state.checkGrass, this.state.checkIndoor)
                }
                this.props.navigation.navigate('Map')
              }}
              title="Set Filters"
            />
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
