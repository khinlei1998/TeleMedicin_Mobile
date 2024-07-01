import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-ui-lib';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form'
import { fetchprescription } from '../../../redux/Treatmentreducer';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nodataIcon } from '../../../components/common';
import LottieView from "lottie-react-native";
const TreatmentList = (props) => {
    const [phone, setphone] = useState()
    const { prescrptions } = props
    const filteredprescriptions = prescrptions.filter(value => value.patient_hist_data.patient_phone == phone)

    useEffect(() => {

        AsyncStorage.getItem("Phone_no").then((token) => {
            setphone(token)
            if (token) {
                props.fetchprescription()

            }
        })
    }, [])
    const btndetail = (code) => {
        props.navigation.navigate('Treatment Detail', { params: code });

    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            {filteredprescriptions.length > 0 ?
                filteredprescriptions.map((value, key) => {
                    return (
                        <Card borderRadius={20} >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 27, height: 27, margin: 5, }} source={require('../../../../assets/images/category/drugs.png')} />
                                <View>
                                    <Text >Prescription</Text>
                                    <Text >{value.code}</Text>
                                    <Text style={styles.drugdate}>{moment(value.prescription_code.created_at).format('l')}</Text>

                                </View>


                                <View style={{ position: 'absolute', right: 0, marginTop: 7 }}>
                                    <TouchableOpacity onPress={() => btndetail(value)} >
                                        <Image style={{ width: 27, height: 27, }} source={require('../../../../assets/images/category/next.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </Card>

                    )
                }) :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LottieView
                        source={require("../../../../assets/images/datanotfound.json")}
                        style={styles.lottie}
                        autoPlay
                    />
                </View>

            }


        </View>
    );
}


const stateToProps = state => {
    return {
        prescrptions: state.Treatment.prescriptions
    };
}

const TreatmentListwrap = reduxForm({
    form: "TreatmentForm",


})(TreatmentList)
export default connect(stateToProps, { fetchprescription })(TreatmentListwrap)

const styles = StyleSheet.create({
    drugdate: {
        fontSize: 12,
        marginTop: 5,
        color: '#9c9c9c'

    },
    itemImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginTop: 14
    },

    lottie: {
        width: 250,
        height: 250,
    }



})