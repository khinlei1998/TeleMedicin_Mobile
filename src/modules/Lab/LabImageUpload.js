import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { reduxForm, } from 'redux-form';
import { connect } from "react-redux";
import { patientuploadImage } from '../../redux/Labreducer';
import SweetAlert from 'react-native-sweet-alert';
import { useTranslation } from 'react-i18next';

const LabImageUpload = (props) => {
    const { t, i18n } = useTranslation();
    const data = props.route.params.params
    const patient = props.route.params.labdata.patient_hist_data
    console.log('data', data);
    console.log('patient', patient);

    const [images, setmages] = useState()
    const { handleSubmit } = props
    const [spinner, setclosespinner] = useState(false);
    const btnsubmit = () => {
        //setclosespinner(true)
        //setclosespinner(false)
        // props.initialize()
        // SweetAlert.showAlertWithOptions({
        //     title: 'Imgae Upload Successfully',
        //     subTitle: '',
        //     confirmButtonTitle: 'OK',
        //     confirmButtonColor: '#000',
        //     otherButtonTitle: 'Cancel',
        //     otherButtonColor: '#dedede',
        //     style: 'success',
        //     cancellable: true
        // }),
        //     props.navigation.navigate('Home')
        props.patientuploadImage(data, patient, (type) => {
            if (type == 'labsuccess') {
                setclosespinner(false)
                props.initialize()
                SweetAlert.showAlertWithOptions({
                    title: 'Imgae Upload Successfully',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                }),
                    props.navigation.navigate(t('Home'))


            } else {
                setclosespinner(false)
                SweetAlert.showAlertWithOptions({
                    title: 'Upload Fail',
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

        <ScrollView style={styles.container} scroll>

            <View style={styles.row}>
                {data.map((value) => {
                    return (
                        <View style={styles.button}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                <Image
                                    source={{
                                        uri: value.path,
                                    }}
                                    style={styles.buttonImageIconStyle}
                                />
                            </View>


                        </View>
                    )
                })}

                <TouchableOpacity style={styles.signButton} onPress={handleSubmit(btnsubmit)}  >

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
        </ScrollView >
    );
}


const stateToProps = state => {
    return {
    };
}
const Labimagewrap = reduxForm({
    form: "Labimageform",

})(LabImageUpload)
export default connect(stateToProps, { patientuploadImage })(Labimagewrap)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        width: 100,
        height: 170,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "white",
        // alignSelf: "flex-start",
        marginHorizontal: "1%",
        // marginBottom: 2,
        minWidth: "30%",
        textAlign: "center",

    },
    buttonImageIconStyle: {
        marginTop: 5,
        height: 100,
        width: 80,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    signGradient: {
        height: 45,
        borderRadius: 4,
        justifyContent: "center",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,

    },
    signButton: {
        width: '90%',
        marginVertical: 5,
        paddingHorizontal: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
        marginLeft: 15
    },

})