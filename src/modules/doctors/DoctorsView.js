import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';
import { Field, reduxForm } from 'redux-form';
import { colors } from '../../styles';
import { GridRow } from '../../components';
import { connect } from "react-redux";
import { fetchdept } from '../../redux/Department';
import { result } from 'lodash';
import { fetchdoector_by_dept } from '../../redux/Doctorreducer';
import { PHOTO_URL } from '../../components/common';
import { Container } from 'native-base';
const DoctorsScreen = (props) => {

    useEffect(() => {
        fetchdept()

    }, [])
    const btndoctorlist = (id) => {

        props.fetchdoector_by_dept(id)
        props.navigation.navigate('Doctorprofile')

    }
    const { all_depts } = props
    return (
        <ScrollView style={styles.container} scroll>

            <View style={styles.row}>
                {/* <Text>hello</Text>
                    <Text>hello</Text> */}
                {all_depts.map((value) => {
                    return (
                        <View style={styles.button}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                <Image
                                    source={{
                                        uri: `${PHOTO_URL}` + value.logo,
                                    }}
                                    style={styles.buttonImageIconStyle}
                                />
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                                <Text style={styles.txtStyle}>
                                    {value.mm_name}
                                </Text>

                            </View>

                            <TouchableOpacity onPress={() => btndoctorlist(value.id)}>
                                <View row align="center">
                                    <Text style={styles.linktxt}>
                                                Doctor List >>
                                    </Text>
                                    {/* <Image source={assets.arrow} color={colors.link} /> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>

        </ScrollView >
    )

}
const stateToProps = state => {
    return {
        all_depts: state.dept.depts
    };
}
const Doctorsviewformwrapp = reduxForm({
    form: "Doctorviewform",

})(DoctorsScreen)
export default connect(stateToProps, { fetchdept, fetchdoector_by_dept })(Doctorsviewformwrapp)
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // backgroundColor:"#5da7ec",
        flex: 1,

    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',

    },

    button: {
        width: 80,
        height: 200,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "#5da7ec",
        alignSelf: "center",
        marginHorizontal: "5%",
        marginBottom: 6,
        minWidth: "40%",
        textAlign: "center",
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,

    },

    buttonImageIconStyle: {
        marginTop: 14,
        height: 80,
        width: 80,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'
    },

    txtStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontFamily: 'ZawDecode',
        textAlign: 'center',
        fontWeight: 'bold',
    },


    linktxt: {
        // color: '#f36f21',
        color: 'white',
        marginTop: 20,

        textAlign: 'center',
    },



});
