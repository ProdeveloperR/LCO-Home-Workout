import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Alert, StatusBar } from 'react-native'
import { Button, Card, HelperText, ActivityIndicator, IconButton, Drawer, Paragraph } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Audio, Icon } from 'expo-av'
import { WebView } from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Speech from 'expo-speech';
const workouts = [
    {
        name: 'Rowing',
        id: 0,
        sets: '2 sets of 10',
        time: 10,
        // img: '../assets/1.png'

    },
    {
        name: 'Push-ups',
        id: 1,
        sets: '2 sets of 10',
        time: 8,
        // img: '../assets/1.png'

    },
    {
        name: 'Sit-ups',
        id: 2,
        sets: '5 sets of 8',
        time: 4,
        // img: '../assets/1.png'

    },
    {
        name: 'Toe-touch',
        id: 3,
        sets: '1 set of hundred',
        time: 6,
        // img: '../assets/1.png'

    },
    {
        name: 'Side-stretch',
        id: 4,
        sets: '10 sets of 10',
        time: 3,
        // img: '../assets/1.png'
    },
    {
        name: 'Dumbells-Pushup',
        id: 5,
        sets: '1 set of 5',
        time: 1,
        // img: '../assets/1.png'
    },
    {
        name: 'Dumbbell',
        id: 6,
        sets: '1 set of 5',
        time: 7,
        // img: '../assets/1.png'
    },
]
let job = null;
const soundObject = new Audio.Sound()
soundObject.loadAsync(require('../assets/audio1.mp3'));
const htmFile = require('../assets/Html/index.html')
export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            value: '',
            isBreakTime: false,
            iconName: 'ios-volume-high',
            isWebViewVisible: 'true',
            excersieDescrition: null,
        }
        this.text = React.createRef()
    }
    start = async () => {
        job = workouts[Math.floor(Math.random() * workouts.length)]
        Speech.speak(job.name)
        soundObject.playAsync();
        soundObject.setIsLoopingAsync(true)
        this.setState({ isPlaying: true })

    }
    break = async () => {
        const { isBreakTime } = this.state
        setTimeout(async () => {
            //After every one minute give a 40 second break
            Speech.speak('Break Time')

            setTimeout(() => {
                //Alert.alert('FINISHED BREAK')
                //WHEN FINISHED BREAK EXECUTE THIS FUNCTION
                this.start()
                //isBreakTime ? this.setState({ isBreakTime: false }) : 'Not break'
            }, 4000)//40000

            soundObject.stopAsync();
            //this.setState({ isBreakTime: true })

            //THIS TIME IS FINISHED THEN ALERT 'BREAK TIME'
            // (job.time !== null) ? job.time * 60000 :
        }, 6000)//60000
    }
    componentDidUpdate() {
        this.break()
    }
    UNSAFE_componentWillMount() {
        soundObject.stopAsync();
        console.disableYellowBox = false
    }

    moreInfo = () => {
        let toeTouchDes = 'Stretching the back and hamstring. The classic standing toe touch will stretch the hamstrings and the four muscle groups found in the back of thigh. Using this exercise, you can also work on the erector spinae muscles that are found on the lower back. ... The walking toe touches can work on hamstrings and the hips.'
        this.setState({ excersieDescrition: toeTouchDes })
        // Alert.alert('HAHAH' + job.name)
    }

    render() {
        // console.log(img)
        if (this.state.isPlaying) {
            return (
                <ScrollView style={{ flex: 1 }} style={{ backgroundColor: '#2FABBC' }}>
                    <View style={styles.box}>
                        <Card style={styles.card} onPress={() => this.moreInfo()}>
                            <Image style={styles.img}
                                source={job.name === 'Push-ups' ? require("../assets/Icons/Push1.png") :
                                    (job.name === 'Sit-ups') ? require('../assets/Icons/Sit1.png') :
                                        (job.name === 'Toe-touch') ? require('../assets/Icons/ToeTouch.png') :
                                            (job.name === 'Side-stretch') ? require('../assets/Icons/Side-Stretch.png') :
                                                (job.name === 'Leg-up') ? require('../assets/Icons/Leg-up.png') :
                                                    (job.name === 'Dumbbell') ? require('../assets/Icons/Dumbbell.png') :
                                                        (job.name === 'Dumbells-Pushup') ? require('../assets/Icons/Dumbells-PushUps.png') :
                                                            (job.name === 'Rowing') ? require('../assets/Icons/Rowing.png') :

                                                                ''} />
                            <Text style={styles.name} key={job.id}>{job.name}</Text>
                            <HelperText key={job.id}>{job.sets}</HelperText>
                            <Ionicons name={this.state.iconName} size={30} color="white" style={{ textAlign: 'right' }} onPress={() => {
                                (this.state.iconName === 'ios-volume-high') ? this.setState({ iconName: 'ios-volume-mute' }) : this.setState({ iconName: 'ios-volume-high' })
                            }} />
                            {/* <WebView style={{ height: 100, }}
                                originWhitelist={['*']}
                                source={htmFile} /> */}
                            <Paragraph>{this.state.excersieDescrition}</Paragraph>
                        </Card>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#EF4F3F' }}>
                    {/* <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator color="red" size="large" />
                        <Text style={{ margin: 10 }}>Waiting for you...</Text>
                    </View> */}
                    <StatusBar barStyle="dark-content" />
                    <Text style={{ marginHorizontal: 13, marginTop: 40, fontSize: 40, color: '#ffffff', fontWeight: 'bold' }}>Excerise</Text>
                    <Text style={{ textAlign: 'right', marginHorizontal: 9, fontSize: 13, color: '#ffffff', fontWeight: 'bold' }}
                        onPress={() => this.start()}>Skip</Text>

                    <ScrollView style={{ marginTop: 20, }}>
                        {workouts.map((value) => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <Card style={{ margin: 15, backgroundColor: '#FEB74D', flex: 1, display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ paddingVertical: 16, paddingHorizontal: 10, }}>{value.name}</Text>
                                        <Ionicons style={{ textAlign: 'right', marginHorizontal: 10, color: '#ffffff' }} name="ios-cut" size={20} onPress={() => {
                                            Alert.alert(value.name, 'Do you want to remove this item?',
                                                [
                                                    {
                                                        text: 'Cancel', onPress: () => { return 'Canceled' }

                                                    },
                                                    {
                                                        text: 'Yes', onPress: () => {
                                                            //Remove item from here
                                                            const id = value.id
                                                            //Removes the item with id
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
                        <Button style={{ marginBottom: 20, marginHorizontal: 40 }} mode="contained" onPress={() => this.start()}>
                            Lesgo
                        </Button>
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

// @learner jobs.splice(Math.floor(Math.random() * jobs.length), 1);
{/* <Text>{JSON.stringify(workouts, + 1)}</Text> */ }

{/* <ScrollView style={{ flex: 1 }}>

<View style={styles.box}>
    <Card style={styles.card}>
        <Image source={require("../assets/1.png")} style={styles.img} />
        <Button mode="text">Do five pushups</Button>
    </Card>
    <Card style={styles.card}>
        <Image source={require("../assets/1.png")} style={styles.img} />
        <Button mode="text">Do five pushups</Button>
    </Card>
</View>
</ScrollView> */}

// const imgs = [1, 2, 3, 4, 5, 6, 7]
        // const finalImg = imgs[Math.floor(Math.random() * imgs.length)]
        // for (let index = 2; index < imgs.length; index++) {
        //     const finalImg = imgs[Math.floor(Math.random() * imgs.length)]
        //     const { displayImgs } = this.state
        //     console.log(finalImg)

        // }

        // {workouts.map(workout => {
        //     return (
        //         <View style={styles.box} key={workout.id}>
        //             <Card style={styles.card}>
        //                 <Text style={styles.name}>{workout.name}</Text>
        //                 <HelperText>{workout.sets}</HelperText>
        //             </Card>
        //         </View>
        //     )
        // })}

         // timerStarted = async () => {
    //     const soundObject = new Audio.Sound()
    //     Alert.alert(
    //         workouts[0].name,
    //         'Press lesgo to start',
    //         [
    //             {
    //                 text: 'LESGO', onPress: async () => {
    //                     try {
    //                         await soundObject.loadAsync(require('../assets/audio1.mp3'));
    //                         await soundObject.playAsync()
    //                         soundObject.setIsLoopingAsync(true)
    //                         this.setState({ isPlaying: true })
    //                     } catch (e) {
    //                         Alert.alert(e.message)
    //                     }
    //                 }
    //             },
    //         ],
    //         { cancelable: false }
    //     )
    //     setTimeout(() => {
    //         soundObject.pauseAsync()
    //         Alert.alert(
    //             'Break time',
    //             'You have 40 second break',
    //             [
    //                 {
    //                     text: 'Ok', onPress: async () => {
    //                         soundObject.stopAsync()
    //                         setTimeout(() => {
    //                             console.log('Break has finished')
    //                         }, 40000)
    //                     }
    //                 }
    //             ], { cancelable: false })
    //     }, workouts[0].time * 60000)

    // }
    // componentDidMount() {
    //     this.timerStarted()
    // }