import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import Home from './Screens/Home'
import Feed from './Screens/Feed'
const Drawer = createStackNavigator()
export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}
class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
          <Drawer.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
