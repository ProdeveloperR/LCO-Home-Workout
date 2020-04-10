import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Alert, StatusBar } from 'react-native'
import { Button, Card } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Audio } from 'expo-av'
import { WebView } from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { workouts } from '../assets/Files/Api'




let job = null;
let logoName = 'ios-volume-high'
let soundObject = new Audio.Sound();
try {
    soundObject.loadAsync(require('../assets/audio1.mp3'));

} catch (e) {
    Alert.alert(e.message)
}

const htmFile = require('../assets/Files/index.html')
export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            value: '',
            isBreakTime: false,
            isWebViewVisible: 'true',
            excersieDescrition: null,
        }
        this.text = React.createRef()
    }
    start = async () => {
        job = workouts[Math.floor(Math.random() * workouts.length)]
        Speech.speak(job.name)
        try {
            await soundObject.playAsync();
        } catch (e) {
            Alert.alert(e.message)
        }
        this.setState({ isPlaying: true })

    }
    break = async () => {
        setTimeout(async () => {
            //After every one minute give a 40 second break
            Speech.speak('Break Time')
            setTimeout(() => {
                //WHEN FINISHED BREAK EXECUTE THIS FUNCTION
                this.start()
            }, 4000)//40000
            try {
                await soundObject.stopAsync();
            } catch (e) {
                Alert.alert(e.message)
            }
            //THIS TIME IS FINISHED THEN ALERT 'BREAK TIME'
            // (job.time !== null) ? job.time * 60000 :
        }, 6000)//60000
    }
    componentDidUpdate() {
        this.break()
    }
    render() {
        if (this.state.isPlaying) {
            return (
                <ScrollView style={{ flex: 1 }} style={{ backgroundColor: '#6AAFDB' }}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.box}>
                        <Card style={styles.card}>
                            <Image style={styles.img}
                                source={job.name === 'Push-ups' ? require("../assets/Icons/Push1.png") :
                                    (job.name === 'Sit-ups') ? require('../assets/Icons/Sit1.png') :
                                        (job.name === 'Toe-touch') ? require('../assets/Icons/ToeTouch.png') :
                                            (job.name === 'Side-stretch') ? require('../assets/Icons/Side-Stretch.png') :
                                                (job.name === 'Leg-up') ? require('../assets/Icons/Leg-up.png') :
                                                    (job.name === 'Dumbbell') ? require('../assets/Icons/Dumbbell.png') :
                                                        (job.name === 'Dumbells-Pushup') ? require('../assets/Icons/Dumbells-PushUps.png') :
                                                            (job.name === 'Rowing') ? require('../assets/Icons/Rowing.png') :
                                                                (job.name === ' Stand-still') ? require('../assets/Icons/Stand-still.png') :
                                                                    (job.name === 'Leg-Swissball') ? require('../assets/Icons/Leg-Swissball.png') :
                                                                        ''} />
                            <Text style={styles.name}>{job.name}</Text>
                            <Ionicons name={logoName} size={30} color="white" style={{ textAlign: 'right' }} />
                        </Card>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#385A90' }}>
                    <StatusBar barStyle="ligh-content" />
                    <Text style={{ marginHorizontal: 13, marginTop: 26, fontSize: 40, color: '#ffffff', fontWeight: 'bold' }}>Excerise</Text>
                    <Button style={{ marginTop: 13, marginHorizontal: 40 }} mode="contained" onPress={() => this.start()}>Lesgo</Button>
                    <ScrollView style={{ marginTop: 20, }}>
                        {workouts.map((value) => {
                            return (
                                <View style={{ flex: 1 }} key={value.id}>
                                    <Card style={{ margin: 15, backgroundColor: '#73CFFC', flex: 1, display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ paddingVertical: 16, paddingHorizontal: 10, }}>{value.name}</Text>
                                        <Ionicons style={{ textAlign: 'right', marginHorizontal: 10, color: '#ffffff' }} name="ios-cut" size={20} onPress={() => {
                                            Alert.alert(value.name, 'Do you want to remove this item?',
                                                [
                                                    { text: 'Cancel', onPress: () => { return 'Canceled' } },
                                                    {
                                                        text: 'Yes', onPress: () => {
                                                            const id = value.id
                                                            workouts.splice(id, 1)
                                                        }
                                                    },
                                                ],
                                            )
                                        }} />
                                    </Card>
                                </View>
                            )
                        })}
                    </ScrollView>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
    },
    card: {
        display: 'flex',
        flex: 1,
        marginTop: 60,
        marginHorizontal: 12,
        backgroundColor: '#2072D4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 29,
        paddingVertical: 10,
        color: '#ffffff'
    },
    img: {
        height: 290,
        width: 300,
    },
    readyText: {
        fontSize: 30,
        marginBottom: 20,
        backgroundColor: 'red',
    }
})

{/* <Text>{JSON.stringify(workouts, + 1)}</Text> */ }

// iconUpdate = () => {
//     if (logoName === 'ios-volume-high') {
//         // console.log(logoName)
//         logoName = 'ios-volume-mute'
//         soundObject.setIsMutedAsync(true)
//     } else {
//         soundObject.setIsMutedAsync(false)
//     }
// }

{/* <WebView style={{ height: 100, }}
                                originWhitelist={['*']}
                                source={htmFile} /> */}


{/* <Paragraph>{this.state.excersieDescrition}</Paragraph> */ }
