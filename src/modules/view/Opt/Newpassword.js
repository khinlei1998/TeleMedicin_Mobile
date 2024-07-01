import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import Textinput from '../../ui/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import { updateuser_by_otp } from '../../../redux/Signupreducer';
import SweetAlert from 'react-native-sweet-alert';

const sad = require('../../../../assets/images/pages/refresh.png');

const Newpassword = (props) => {
    const { handleSubmit, get_list_forget } = props


    const onsubmit = (values) => {
        // alert('success')
        const test = Object.assign({}, get_list_forget, {
        })
        props.initialize(test)
        props.updateuser_by_otp(values, test, (type) => {
            if (type == 'updatesuccess') {
                SweetAlert.showAlertWithOptions({
                    title: 'User Account Update Successfully',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                }),
                    props.navigation.navigate('Home');

            } else {
                SweetAlert.showAlertWithOptions({
                    title: 'Try Again',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'error',
                    cancellable: true
                },
                    callback => console.log('callback'));
            }
        })

    }

    return (
        <ScrollView >
            <SafeAreaView style={styles.container}>

                <Card style={styles.cardstyle}>
                    <View style={styles.container}>
                        <Image
                            resizeMode="contain"
                            source={sad}
                            style={styles.itemImage} />
                    </View>

                    <View style={styles.passcontainer}>
                        <Field name="password" iconname="lock" label="Please Enter New Password" component={Textinput} placeholder={'Password'} />


                        <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onsubmit)} >

                            <LinearGradient
                                colors={["#2980B9", "#6DD5FA"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.signGradient}
                            >
                                <Text style={styles.signText}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </Card>



            </SafeAreaView>

        </ScrollView>
    );
}
function statetoprops(state) {
    return {
        get_list_forget: state.patient.phoneno_forget
    }
}
const Newpasswordwrap = reduxForm({
    form: "NewpasswordForm",

})(Newpassword)
export default connect(statetoprops, { updateuser_by_otp })(Newpasswordwrap)
const styles = StyleSheet.create({

    passcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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
        //width: '70%',
        borderRadius: 15,
        justifyContent: "center",
        marginTop: 10
    },
})