import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { createuser } from '../../../redux/Signupreducer';
import SweetAlert from 'react-native-sweet-alert';
import PhoneInput from "react-native-phone-number-input";
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Otpview = (props) => {
    const { t, i18n } = useTranslation();
    const [phoneNumber, setphoneNumber] = useState();
    const [confirmResult, setconfirmResult] = useState();
    const [message, setMessage] = useState('')
    const [user, setUser] = useState()
    const [phoneerror, setPhoneError] = useState()


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('auth user', user);
                setUser({ user: user.toJSON() })
            } else {
                setUser(null)
            }
        })
        // return subscriber;
        return setUser;
    }, [])


    const signIn = async () => {
        if (!phoneNumber) {
            setPhoneError("PhoneNumber Filed required");
            return;
        } else {
            setPhoneError("");
        }
        setMessage('Sending code ...')
        // await auth().verifyPhoneNumber('+95' + phoneNumber)
        await auth().signInWithPhoneNumber('+95' + phoneNumber)

            .then(confirmResult => {
                console.log('confirmResult', confirmResult)
                setconfirmResult(confirmResult)
                setMessage('Code has been sent!')

            })
            .catch(error => setMessage(`Sign In With Phone Number Error: ${error.message}`));

    };
    const renderPhoneNumberInput = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <PhoneInput
                    defaultValue={phoneNumber}
                    value={'09'}
                    defaultCode="MM"
                    layout="first"
                    onChangeText={(text) => {
                        setphoneNumber(text)
                    }}
                    withDarkTheme
                    withShadow
                    autoFocus
                />
                <Text
                    style={{
                        color: "red",
                    }}
                >
                    {phoneerror ? phoneerror : ""}
                </Text>


                <TouchableOpacity style={styles.signButton} onPress={() => signIn()}>
                    <LinearGradient
                        colors={["#0b8028", "#76b084"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.signGradient}
                    >
                        <Text style={styles.signText}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>


        );
    }

    async function confirmCode(code) {
        const device_token = await AsyncStorage.getItem('device_token')
        const user_data = props.route.params.data
        const patient_info = user_data
        patient_info.phone_number = phoneNumber
        patient_info.date_of_birth = user_data.date_of_birth != 'Invalid date' ? user_data.date_of_birth : ""
        patient_info.gender = user_data.gender ? user_data.gender : ''
        patient_info.devicetoken = device_token
        try {
            // const credential = auth.PhoneAuthProvider.credential(confirmResult.verificationId, code);
            // console.log('firebase secret', credential);
            await confirmResult.confirm(code)
            props.createuser(patient_info, (type) => {

                if (type == 'signupsuccess') {
                    SweetAlert.showAlertWithOptions({
                        title: 'User Account Successfully',
                        subTitle: '',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: '#000',
                        otherButtonTitle: 'Cancel',
                        otherButtonColor: '#dedede',
                        style: 'success',
                        cancellable: true
                    }),
                        props.navigation.navigate(t('Home'));

                } else {

                    SweetAlert.showAlertWithOptions({
                        title: 'Your Phone Number still exit ',
                        subTitle: '',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: '#000',
                        otherButtonTitle: 'Cancel',
                        otherButtonColor: '#dedede',
                        style: 'error',
                        cancellable: true
                    },
                        callback => console.log('callback'));
                    props.navigation.navigate(t('Home'))
                }
            })
        } catch {
            SweetAlert.showAlertWithOptions({
                title: 'Code Invalid ',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'error',
                cancellable: true
            },
                callback => console.log('callback'));
            props.navigation.navigate(t('Home'))
        }

    }


    const renderVerificationCodeInput = () => {
        return (

            <View style={styles.container}>


                <Text white bold center style={{ marginTop: 20, }}>

                    Please Enter The Code We Just Send To
                </Text>

                <OTPInputView
                    style={styles.otpView}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    onCodeFilled={(code) => confirmCode(code)}
                />
            </View>
        );
    }

    const renderMessage = () => {
        if (!message.length) return (
            <>
            </>
        );
        return (
            <View style={styles.viewCardtype}>
                <Text style={{ padding: 5, color: 'black', fontWeight: 'bold', fontSize: 15 }}>{message}</Text>

            </View>
        );
    }



    return (
        <View style={{ flex: 1 }}>

            {!user && !confirmResult && renderPhoneNumberInput()}

            {confirmResult && renderVerificationCodeInput()}

            {renderMessage()}
        </View>
    );
}





const otpwrape = reduxForm({
    form: "Otpformm",

})(Otpview)
export default connect(null, { createuser })(otpwrape)

const styles = StyleSheet.create({
    viewCardtype: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        backgroundColor: 'white',
        height: 40,
        width: '95%',
        marginLeft: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 12,

    },

    otpView: {
        width: '80%',
        height: 200,
        color: 'black',
    },
    signButton: {
        width: "90%",
        marginLeft: 20
    },

    signGradient: {
        height: 45,
        width: '90%',
        borderRadius: 15,
        marginLeft: 7,
        justifyContent: "center",
        marginTop: 30
    },

    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        color: 'black',
        borderBottomColor: 'black',
    },
})
