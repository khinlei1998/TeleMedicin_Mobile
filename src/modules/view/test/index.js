import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const Apptest = () => {

    return (
        <View style={styles.container}>

            <Text white bold center style={{ marginTop: 20, }}>

                Please Enter The Code We Just Send To
            </Text>

            <OTPInputView
                style={styles.otpView}
                pinCount={6}
                autoFocusOnLoad
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                codeInputFieldStyle={styles.underlineStyleBase}
                onCodeFilled={(code) => confirmCode(code)}
            />




        </View>
    );
}

const stateToProps = state => {
    return {

    };
}
// export default Apptest
export default connect(stateToProps, null)(Apptest)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    testing: {
        color: 'black'
    }
});