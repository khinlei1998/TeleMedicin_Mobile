import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Container, Header, Content, CardItem, Thumbnail, Text, Icon, Left, Body, Right, Row } from 'native-base';
import { connect } from "react-redux";
import { Field, reduxForm, reset, formValueSelector, } from 'redux-form';
import RenderSelect from '../../ui/DropDownPicker';
import LinearGradient from 'react-native-linear-gradient';
import validate from './validate';
const AppointmentIcon = require('../../../../assets/images/category/debit-card.png');

const PaymentScreen = (props) => {
const {handleSubmit}=props
    const options = [
        {
            name: 'K Pay',
            code: 'kpay'
        },

        {
            name: 'MPU',
            code: 'mpu'
        }
    ];
    const [selected, setSelected] = useState()

    const onSubmit=(values)=>{
        console.log(`here is the value ${JSON.stringify(values.payment)}`)
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>


            <Card style={styles.cardstyle}>
                {/* <View style={styles.test}>
              <Image
                resizeMode="contain"
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                style={styles.itemImage}
              />
            </View> */}
                <Card.Content>
                    <Card style={styles.imgContainer}>
                        <View style={styles.aligncontainer}>
                            <Image
                                resizeMode="contain"
                                source={AppointmentIcon}
                                style={styles.itemImage}
                            />
                            <Text style={{ fontWeight: 'bold' }}>Payment Method</Text>
                        </View>
                    </Card>

                    {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Doctor Name : </Text>
                        <Text style={styles.decText}>ll</Text>
                    </View> */}

                    <View style={{ marginTop: 20 }} >
                        {/* <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Please Choose Township</Text> */}

                        <Field
                            name="payment"
                            getvalue={selected}
                            component={RenderSelect}
                            options={options}
                            setValue={setSelected}
                            titleText="select Payment Method"
                            oldvalue="Pay with"
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Doctor Name : </Text>
                        <Text style={styles.decText}>Doc1</Text>
                    </View>

                    {/* <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    /> */}

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Date & Time : </Text>
                        <Text style={styles.decText}>2021|10-12 AM</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Service : </Text>
                        <Text style={styles.decText}>Chat</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Phone Number : </Text>
                        <Text style={styles.decText}>9965419258</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
                        <Text style={styles.nameText}> Fees : </Text>
                        <Text style={styles.decText}>10000 MMK</Text>
                    </View>


                    {/* 4th divider */}
                    <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />

                    <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onSubmit)}>


                        <LinearGradient
                            colors={["#2980B9", "#6DD5FA"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.signGradient}
                        >
                            <Text style={styles.signText}>Pay Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const stateToProps = state => {
    return {

    };
}


const paymentwrap = reduxForm({
    form: "Payment",
    validate

})(PaymentScreen)
export default connect(stateToProps, null)(paymentwrap)
const styles = StyleSheet.create({

    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },

    signGradient: {
        height: 45,
        width: '100%',
        borderRadius: 15,
        marginLeft: 7,
        justifyContent: "center",
        marginTop: 30
    },

    signButton: {
        width: "100%",
        marginVertical: 7,
        paddingHorizontal: 9,
    },
    verticleLine: {
        height: '50%',
        width: 1,
        backgroundColor: '#909090',
        marginLeft: 9,
        top: 10
    },
    test: {
        position: 'absolute',
        right: 50,
        top: 0,

    },
    aligncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        shadowColor: '#000000',
        borderLeftColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
        marginTop: -60,
    },
    cardstyle: {
        textAlign: 'center',
        marginTop: 50,
        marginVertical: 10,
        alignSelf: 'baseline',
        marginLeft: 10,
        width: '95%',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
    },
    itemImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        width: 65,
        height: 65,
        // borderWidth: 4,
        borderColor: "white",
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
    },
    decText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    lottie: {
        width: 100,
        height: 100
    }
})