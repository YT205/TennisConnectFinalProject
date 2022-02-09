import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import Maps from './Maps';
import Match from './Match';
import Forum from './Forum';

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

// const CustomTabBarButton = ({children, onPress}) => (
//     <TouchableOpacity
//         style={{
//             top: -30,
//             justifyContent: 'center',
//             alignItems: 'center',
//             ... styles.shadow
//         }}
//         onPress={onPress}
//     >
//         <View
//             style={{
//                 width: 70,
//                 height: 70,
//                 borderRadius: 37,
//                 backgroundColor: '#022d73'
//             }}>
//             {children}
//         </View>
//     </TouchableOpacity>    
// )


const Tabs = () => {
    return(
        <Tab.Navigator

            screenOptions={{
                tabBarShowLabel: false,
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
            <Tab.Screen name="Maps" component={Maps} options={{
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

            <Tab.Screen name="Match" component={Match} options={{
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

            <Tab.Screen name="Forum" component={Forum} options={{
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
        </Tab.Navigator>
    );
}

export default Tabs;