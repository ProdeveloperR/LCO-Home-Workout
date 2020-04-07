import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
export default class App extends React.Component {
  start = () => {

  }
  render() {
    return (
      <ImageBackground source={require('./assets/bg.jpg')} style={styles.container}>
        <View style={styles.parent}>
          <TouchableOpacity onPress={() => this.start()}>
            <Button mode="contained" style={styles.startBtn} color="#0945F3" ><Text style={styles.statrTxt}>Lesgo</Text></Button>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  startBtn: {
    marginHorizontal: 20,
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    flex: 0,
    alignSelf: 'center',
    borderRadius: 100,
  },
  statrTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})