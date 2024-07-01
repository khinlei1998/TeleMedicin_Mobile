import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card, } from 'react-native-paper';
const sad = require('../../../../assets/images/pages/sad.png');
import { Field, reduxForm } from 'redux-form';
import Textinput from '../../ui/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { fetchphonenobyforget } from '../../../redux/Patientreducer';
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
const ForgotPassword = (props) => {
    const { t, i18n } = useTranslation();
    const { handleSubmit } = props
    const [confirmResult, setconfirmResult] = useState()
    const [patientdata, setpatientdata] = useState()
    const [message, setMessage] = useState('')

    async function confirmCode(code) {
        try {
            const credential = auth.PhoneAuthProvider.credential(confirmResult.verificationId, code);
            if (credential.secret == code) {
                props.navigation.navigate('New Password Form');
                props.fetchphonenobyforget(patientdata)
            }
        } catch {

        }

        // props.navigation.navigate('New Password Form');
        // props.fetchphonenobyforget(patientdata)
        // console.log('confirmresult', confirmResult)


    }

    const onSubmit = async (values) => {
        setMessage('Sending code ...')
        // setconfirmResult('result')
        // setpatientdata(values.phone_number)
        // setMessage('Code has been sent!')
        await auth().verifyPhoneNumber('+95' + values.phone_number)
            .then(confirmResult => {
                setconfirmResult(confirmResult)
                setpatientdata(values.phone_number)
                setMessage('Code has been sent!')
            })
            .catch(error => setMessage(`Sign In With Phone Number Error: ${error.message}`));


    }

    const renderPhoneNumberInput = () => {
        return (
            <ScrollView >
                <SafeAreaView style={styles.container}>

                    <Card style={styles.cardstyle}>
                        <View style={styles.container}>
                            <Text style={{ fontSize: 20, marginTop: 15 }}>{t('Forgot Password')}?</Text>
                            <Image
                                resizeMode="contain"
                                source={sad}
                                style={styles.itemImage} />
                            <Text style={{ fontSize: 18, marginTop: 15, marginBottom: 19, textAlign: 'center' }}>Enter Number associated with your account</Text>

                        </View>

                        <View style={styles.container}>
                            <Field name="phone_number" iconname="phone" label="Phone Number" component={Textinput} placeholder={'phone_number'} />



                            <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onSubmit)}>

                                <LinearGradient
                                    colors={["#2980B9", "#6DD5FA"]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.signGradient}
                                >
                                    <Text style={styles.signText}>Get OTP</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </Card>



                </SafeAreaView>

            </ScrollView>
        )
    }

    const renderVerificationCodeInput = () => {

        return (
            <View style={styles.container}>

                <Text white bold center style={{ marginTop: 20, }}>

                    Please Enter The Code We Just Send To
                </Text>

                <OTPInputView
                    autoFocusOnLoad={false}
                    style={styles.otpView}
                    pinCount={6}
                    // autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    onCodeFilled={(code) => confirmCode(code)}
                />




            </View>
        )
    }
    const renderMessage = () => {
        if (!message.length) return (
            <></>
        );
        return (
            <View style={styles.viewCardtype}>
                <Text style={{ padding: 5, color: 'black', fontWeight: 'bold', fontSize: 15 }}>{message}</Text>

            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>

            {!confirmResult && renderPhoneNumberInput()}
            {confirmResult && renderVerificationCodeInput()}
            {renderMessage()}
        </View>



    );
}


const ForgotPasswordwrap = reduxForm({
    form: "ForgotPasswordwrapform",

})(ForgotPassword)
export default connect(null, { fetchphonenobyforget })(ForgotPasswordwrap)

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
    itemImage: {
        width: 70,
        height: 70,

        marginTop: 14
    },
    cardstyle: {
        textAlign: 'center',
        marginTop: 37,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signButton: {
        width: "100%",
        marginVertical: 7,
        paddingHorizontal: 9,
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    signGradient: {
        height: 45,
        borderRadius: 15,
        justifyContent: "center",
        marginTop: 10
    },

    otpView: {
        width: '80%',
        height: 200,
        color: 'black',
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