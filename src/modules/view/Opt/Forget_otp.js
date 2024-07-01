import React, { useState } from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchphonenobyforget } from '../../../redux/Patientreducer';
const Forgetotp = (props) => {
    const [spinner, setclosespinner] = useState(false);
    async function confirmCode(code) {
        const phone = props.route.params.data
        const confirm = props.route.params.confirm;

        if (confirm.code == code) {
            props.navigation.navigate('New Password Form');
            props.fetchphonenobyforget(phone.phone_number)
        }

    }

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

            <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                {spinner ?
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    :
                    <Text></Text>
                }
            </View>


        </View>
    );
}

const Forgetotpwrap = reduxForm({
    form: "Forgetotpform",

})(Forgetotp)
export default connect(null, { fetchphonenobyforget })(Forgetotpwrap)
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
        borderColor: "#4d7de3",
    },
    testing: {
        color: 'black'
    }
});
