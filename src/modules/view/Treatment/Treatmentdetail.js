import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Card, } from 'react-native-elements'
import moment from 'moment';

const Treatmentdetail = (props) => {
    const prescription_data = props.route.params.params
    return (

        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <SafeAreaView>
                <ScrollView>
                    {prescription_data.prescription_code.length > 0 ?
                        prescription_data.prescription_code.map((value) => {
                            return (
                                <Card borderRadius={20} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 27, height: 27, margin: 5, }} source={require('../../../../assets/images/category/medical-prescription.png')} />
                                        <View style={{ marginTop: 5 }}>
                                            <Text >{value.generic_name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>dose={value.dose},unit={value.unit}</Text>

                                        </View>

                                        <View style={{ position: 'absolute', right: 0, marginTop: 3 }}>
                                            <Text>{moment(value.created_at).format('L')}</Text>
                                        </View>

                                    </View>


                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        marginTop: 15


                                    }} >
                                        <Text style={{
                                            fontSize: 13, color: '#9c9c9c', width: '30%'
                                        }}>Duration</Text>

                                        <Text style={{
                                            fontSize: 13, color: '#9c9c9c', width: '30%'
                                        }}>Brand Name</Text>
                                        <Text style={{
                                            fontSize: 13, color: '#9c9c9c', width: '30%'
                                        }}>Medicine Frequency</Text>
                                    </View>


                                    <View style={{
                                        // flex: 1,
                                        flexDirection: 'row',
                                        // flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        marginTop: 3
                                    }} >
                                        <Text style={{
                                            fontSize: 13, color: 'black', width: '30%'
                                        }}>{value.duration}</Text>

                                        <Text style={{
                                            fontSize: 13, color: 'black', width: '30%'
                                        }}>{value.brand_name}</Text>
                                        <Text style={{
                                            fontSize: 13, color: 'black', width: '30%'
                                        }}>{value.medication_frequency}</Text>
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <Card.Divider />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 20, height: 20, }} source={require('../../../../assets/images/category/notes.png')} />

                                        <Text style={{ fontWeight: 'bold', }}>Remark</Text>
                                    </View>

                                    <Text style={{ marginTop: 15 }}>{value.remark}</Text>




                                </Card>
                            )
                        }
                        )
                        :
                        <></>
                    }


                </ScrollView>
            </SafeAreaView>

        </View >
    );
}

export default Treatmentdetail;
const styles = StyleSheet.create({

})