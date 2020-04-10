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
const Stack = createStackNavigator()
export default class App extends React.Component {
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }
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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
