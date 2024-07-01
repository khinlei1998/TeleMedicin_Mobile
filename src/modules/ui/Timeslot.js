import { Image, View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, ScrollView, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';

const Timeslot = ({ meta, finalestate, filtered_doctor, hidemodal, modalVisible, showmodal, availabletime, btntime, input, ...rest }) => {
    input.onChange(availabletime)
    const { t, i18n } = useTranslation();
    var size = finalestate.length;

    const Rendererror = ({ touched, error }) => {
        if (touched && error) {
            return (
                <Text style={{ color: 'red' }}>{error}</Text>
            )
        }
    }

    return (
        <View style={{ marginTop: 10, flex: 1 }}>

            <TouchableOpacity style={styles.filebutton} onPress={showmodal} >
                <LinearGradient
                    colors={["#5da7ec", "#5da7ec"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.signGradient}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 3 }}><Text style={{ color: 'white' }}>{availabletime ? availabletime : t('Appointment Time Slot')}</Text></View>
                </LinearGradient>
            </TouchableOpacity>

            {/* Modal Box */}

            <Modal
                animationType="slide"
                transparent={true}
                coverScreen={true}
                visible={modalVisible}

            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView
                            style={{ height: 190, marginBottom: 50, }}
                        >
                            <Text style={{ marginTop: 10, marginLeft: 10 }} >{availabletime ? availabletime : 'Select Time Slot'}</Text>
                            <TouchableOpacity style={{ position: "absolute", right: 0, }} onPress={showmodal}>
                                <Image style={{ width: 27, height: 27, marginRight: 10, marginTop: 10 }} source={require('../../../assets/images/category/cancel.png')} />
                            </TouchableOpacity>

                            {size != 0 ?
                                finalestate.map((value) => {
                                    return (
                                        Object.keys(value).map(function (result) {
                                            const testing = value[result]
                                            return (
                                                <>
                                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginLeft: 8, marginTop: 10 }}>{result}</Text>
                                                    <View style={{ flexDirection: 'row', marginLeft: 8, marginRight: 8, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                        {Object.keys(testing).map(function (key) {
                                                            return (
                                                                Object.keys(testing[key]).map(function (a) {
                                                                    return (

                                                                        <TouchableOpacity style={{ marginVertical: 6, alignItems: 'center', }} onPress={() => btntime(testing[key][a], result)} >

                                                                            <Text style={styles.subtime}>{testing[key][a]}</Text>
                                                                        </TouchableOpacity>


                                                                    )
                                                                })
                                                            )

                                                        })}

                                                    </View>

                                                </>
                                            )
                                        })
                                    )
                                })

                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <LottieView
                                        source={require("../../../assets/images/datanotfound.json")}
                                        style={styles.lottie}
                                        autoPlay
                                    />
                                </View>
                            }



                        </ScrollView>

                    </View>
                </View>
            </Modal>



            {Rendererror(meta)}

        </View >

    )
}

export default Timeslot
const styles = StyleSheet.create({
    lottie: {
        width: 250,
        height: 250,
    },
    container: {
        flexDirection: 'row',
        marginTop: 15
    },

    subtime: {
        backgroundColor: '#5da7ec',
        // backgroundColor: '#3740ff',
        padding: 4,
        height: 30,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        borderRadius: 4,
        width: 130,
    },

    // row: {
    //     // flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "space-around",

    // },

    buttonClose: {
        backgroundColor: "#f36f21",
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 100
    },
    filebutton: {
        borderRadius: 10,
        width: "55%",
        marginVertical: 7,
        marginLeft: 10,
        paddingHorizontal: 9,
    },
    signGradient: {
        height: 50,
        borderRadius: 7,
        justifyContent: "center",
        shadowColor: "#76b81f",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 22,
        marginBottom: 20
    },
    modalView: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        borderRadius: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%'
    },
})