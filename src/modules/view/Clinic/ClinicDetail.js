import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
    Content,
    Card,
    Text,
    Left,
    Row,
} from 'native-base';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { PHOTO_URL } from '../../../components/common';
const squareIcon = require('../../../../assets/images/pages/square.png');

const ClinicDetail = (props) => {
    const clinic = props.route.params.paramkey
    const array = JSON.parse(clinic.service)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: `${PHOTO_URL}` + clinic.image }} />
            <View style={styles.firstbody}>
                <View style={styles.firstbodyContent}>
                    <Left>
                        <Text style={styles.name}>{clinic.clinic_name}</Text>
                        <Text style={styles.info}>{clinic.phone_number}</Text>
                        <Text style={styles.description}>{clinic.email} </Text>
                    </Left>
                </View>
            </View>
            <View>
                <Content padder>
                    <Card style={{
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.25,
                        elevation: 5,
                        borderRadius: 10,
                    }}>

                        <Row>
                            <Text
                                style={{ color: '#5da7ec', marginLeft: 3, fontWeight: 'bold', marginTop: 14 }}>
                                Services
                            </Text>
                        </Row>

                        <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>
                            <Image
                                resizeMode="contain"
                                source={squareIcon}
                                style={styles.squareImage} />
                            {array.map((item, index) => {
                                return (
                                    <Text style={{ fontSize: 13 }}>{(index ? ', ' : '') + item}</Text>

                                )

                            })}

                        </Row>
                        <View
                            style={{
                                flex: 1,
                                width: '95%',
                                alignSelf: 'center',
                                borderBottomColor: '#83859a',
                                borderBottomWidth: 0.2,
                                fontWeight: 300,
                            }} />
                    </Card>

                </Content>
            </View>
        </ScrollView>
    );
}


const clinicdetailformwrapp = reduxForm({
    form: "Profiledetailform",

})(ClinicDetail)
export default connect(null, {})(clinicdetailformwrapp)


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: "#5da7ec",
        height: 50,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        marginLeft: 6,
        position: 'absolute',
    },
    firstbody: {
        marginTop: 5,
    },
    firstbodyContent: {
        flex: 1,
        marginLeft: 50
    },
    name: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",

    },
    info: {
        fontSize: 13,
        color: "black",
        marginTop: 10
    },
    description: {
        fontSize: 13,
        color: "black",
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    itemImage: {
        width: 23,
        height: 23,
        marginLeft: 10,
        marginTop: 14
    },
    squareImage: {
        width: 10,
        height: 10,
        marginTop: 6,
        marginRight: 3,
        marginLeft: 25
    },
    cvImage: {
        width: 20,
        height: 20
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
        marginLeft: 70,
        marginTop: -7,
        width: '50%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
    },
    signText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
})