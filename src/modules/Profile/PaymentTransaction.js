import { View, Text, ScrollView, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import { Card, } from 'react-native-elements'
import moment from 'moment';
import { connect, useDispatch } from "react-redux";
import { Field, reduxForm, reset } from 'redux-form';
import { fetch_paymenttranslation, fetchappointmentBytranslationlist } from '../../redux/Appointmentreducer';
import { useFocusEffect } from '@react-navigation/native';
import { fetchpatientbyphoneno } from '../../redux/Patientreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PaymentTransaction = (props) => {
    const { all_appointment, patient_by_phone_no, all_paymentlist } = props
    const add_paymentdate = []
    all_paymentlist.map((value) => {
        value.map((fina) => {
            fina.payed_date = moment(fina.created_at).format('L')
            add_paymentdate.push(fina)
        })
    })
    var result = add_paymentdate.reduce(function (r, a) {
        r[a.payed_date] = r[a.payed_date] || [];
        r[a.payed_date].push(a);
        return r;
    }, Object.create(null));

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem("Phone_no").then((token) => {
                if (token) {
                    props.fetchpatientbyphoneno(token)
                    props.fetchappointmentBytranslationlist(token)

                }
            })

        }, [])
    );

    console.log('result', result);
    return (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <SafeAreaView>
                <ScrollView>
                    {/* {Object.keys(result).forEach(function (key) {
                        console.log('testing', result[key]);
                    })} */}

                    {Object.keys(result).map((key) => {
                        return (
                            result[key].map((data) => {
                                return (
                                    <>
                                        <Text style={{ marginLeft: 20, marginTop: 20 }}>{key}</Text>

                                        <Card borderRadius={20}  >
                                            <View style={{ flexDirection: 'row' }}>

                                                <View >
                                                    <Text >{data.customer_name}</Text>
                                                    <View style={{ alignItems: 'center', backgroundColor: '#51BD83', borderRadius: 20, padding: 3, width: 70 }}>
                                                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white', }}>{data.transaction_status}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ position: 'absolute', right: 0, marginTop: 3 }}>
                                                    <Text style={{ color: 'green' }}>-{data.total_amount}</Text>
                                                </View>

                                            </View>


                                            <View style={{
                                                flexDirection: 'row',
                                                // flexWrap: 'wrap',
                                                justifyContent: 'space-between',
                                                marginTop: 15


                                            }} >
                                                <Text style={{
                                                    fontSize: 13, color: '#808080', width: '30%'
                                                }}>Merchant Order ID</Text>

                                                <Text style={{
                                                    fontSize: 13, color: '#808080', width: '30%'
                                                }}>{data.merchant_order_id}</Text>

                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                // flexWrap: 'wrap',
                                                justifyContent: 'space-between',
                                                marginTop: 15


                                            }} >
                                                <Text style={{
                                                    fontSize: 13, color: '#808080', width: '30%'
                                                }}>Transaction Id</Text>

                                                <Text style={{
                                                    fontSize: 13, color: '#808080', width: '30%'
                                                }}>{data.transaction_id}</Text>

                                            </View>
                                        </Card>
                                    </>
                                )
                            })
                        )

                    })}








                </ScrollView>
            </SafeAreaView>

        </View >
    )
}
function maptoprops(state) {
    return {
        patient_by_phone_no: state.patient.patient_by_phoneno,
        all_paymentlist: state.appointment.paymentlist,
    }
}
const PaymentTransactionwrap = reduxForm({
    form: "PaymentTransactionForm",

})(PaymentTransaction)

export default connect(maptoprops, { fetch_paymenttranslation, fetchpatientbyphoneno, fetchappointmentBytranslationlist })(PaymentTransactionwrap)