// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import OTPInputView from '@twotalltotems/react-native-otp-input'

// export default function OtpScreen(props) {
//     async function confirmCode(code) {
//         // try {
//         //     const credential = auth.PhoneAuthProvider.credential(confirmResult.verificationId, code);
//         //     if (credential.secret == code) {
//         //         props.navigation.navigate('New Password Form');
//         //         props.fetchphonenobyforget(patientdata)
//         //     }
//         // } catch {

//         // }

//         props.navigation.navigate('New Password Form');
//         props.fetchphonenobyforget(patientdata)
//         console.log('confirmresult', confirmResult)


//     }

//     return (
//         <View style={styles.container}>

//             <Text white bold center style={{ marginTop: 20, }}>

//                 Please Enter The Code We Just Send To
//             </Text>

//             <OTPInputView
//                 style={styles.otpView}
//                 pinCount={6}
//                 autoFocusOnLoad
//                 codeInputFieldStyle={styles.underlineStyleBase}
//                 onCodeFilled={(code) => confirmCode(code)}
//             />




//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     otpView: {
//         width: '80%',
//         height: 200,
//         color: 'black',
//     },
//     underlineStyleBase: {
//         width: 30,
//         height: 45,
//         borderWidth: 0,
//         borderBottomWidth: 2,
//         color: 'black',
//         borderBottomColor: 'black',
//     }


// })