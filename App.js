import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from './Screens/Home'
import Feed from './Screens/Feed'
const Drawer = createDrawerNavigator()
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
        <Drawer.Navigator statusBarAnimation="fade" drawerPosition="left" drawerType="slide" drawerStyle={{
          backgroundColor: '#2FABBC',
          width: 260,

        }} >
          <Drawer.Screen name="Home" component={Home} options={{}} />
          <Drawer.Screen name="Feed" component={Feed} options={{}} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
