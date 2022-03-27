import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import MapsHandler from './MapsHandler';
import MatchHandler from './MatchHandler';
import ForumHandler from './ForumHandler';
import HomeHandler from './HomeHandler';

const Tab = createBottomTabNavigator()

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false, 
                style: {
                    nposition: 'absolute',
                    bottom: '25',
                    left: '20',
                    right: '20',
                    elevation: '0',
                    backgroundColor: '#ffffff',
                    borderRadius: '15',
                    height: '90',
                    ... styles.shadow
                }
            }}
        >

            <Tab.Screen name="Maps" component={MapsHandler} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/maps.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#022d73' : '#999999'
                            }}
                        />
                        <Text 
                            style={{color: focused ? '#022d73' : '#999999', fontSize: 12}}>
                            Court Maps
                        </Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Match" component={MatchHandler} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/match.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#022d73' : '#999999'
                            }}
                        />
                        <Text 
                            style={{color: focused ? '#022d73' : '#999999', fontSize: 12}}>
                            Matchmaking
                        </Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Forum" component={ForumHandler} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/forum.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#022d73' : '#999999'
                            }}
                        />
                        <Text 
                            style={{color: focused ? '#022d73' : '#999999', fontSize: 12}}>
                            Forums
                        </Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Account" component={HomeHandler} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/account.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#022d73' : '#999999'
                            }}
                        />
                        <Text 
                            style={{color: focused ? '#022d73' : '#999999', fontSize: 12}}>
                            Account
                        </Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;