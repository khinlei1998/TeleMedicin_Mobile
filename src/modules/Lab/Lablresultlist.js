import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../styles';
import {
    Card,
    Row,
} from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { fetchinvestigationlsit } from '../../redux/Labreducer';
import { reduxForm, } from 'redux-form';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nodataIcon } from '../../components/common';
import LottieView from "lottie-react-native";
import { styles } from './Labresultlist_css';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const LabIcon = require('../../../assets/images/pages/microscope1.png');


const LabresultlistScreen = (props) => {
    const { t, i18n } = useTranslation();

    const navigation = useNavigation();
    const { lablist } = props
    const [phoneno, setphoneno] = useState()

    useEffect(() => {
        // navigation.addListener('focus', () => {
        props.fetchinvestigationlsit()

        AsyncStorage.getItem("Phone_no").then((token) => {
            setphoneno(token)
        })

    }, [])
    const btnlabdetail = (data) => {
        props.navigation.navigate('Lab Result Information', { params: data });

    }

    const filteredpatient = lablist.filter(value => value.patient_hist_data.patient_phone == phoneno)
    return (
        <>
            {filteredpatient.length > 0 ?

                <ScrollView>
                    {filteredpatient.map((value, key) => {
                        return (
                            <Card style={styles.cardStyle}>
                                <Row>
                                    <Image
                                        resizeMode="contain"
                                        source={LabIcon}
                                        style={styles.labitemImage}
                                    />
                                    <Text style={styles.titleText}>
                                        {t('Lab Result')}
                                    </Text>
                                </Row>
                                <Row>
                                    <Text style={styles.dateText}>
                                        {t('Date')}
                                    </Text>
                                    <Text style={styles.codeText}>
                                        {t('Refer Lab Code')}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            btnlabdetail(value)
                                        }}
                                        style={styles.signButton}>
                                        <LinearGradient
                                            colors={["#36afb9", "#36afb9"]}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.signGradient}
                                        >
                                            <Text style={styles.signText}>
                                                <Icon
                                                    name='arrow-right'
                                                    type='font-awesome'
                                                    color='#fff'
                                                    alignSelf='center'
                                                    style={{ height: 12, marginLeft: 5 }}
                                                    size={13} />

                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Row>
                                <Row>
                                    <Text style={styles.realdateText}>
                                        {moment(value.created_at).format('L')}
                                    </Text>
                                    <Text style={styles.realcodeText}>
                                        {value.lab_refer_code}
                                    </Text>
                                </Row>

                            </Card>
                        )
                    })}
                </ScrollView>

                :
                // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                //     <Image
                //         resizeMode="contain"
                //         source={nodataIcon}
                //         style={styles.itemImage} />
                //     <Text style={{ color: "#83859a", fontFamily: 'ZawDecode', fontWeight: 'bold', marginTop: 10 }}>အချက်အလက်များမရှိသေးပါ</Text>

                // </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LottieView
                        source={require("../../../assets/images/datanotfound.json")}
                        style={styles.lottie}
                        autoPlay
                    />
                </View>

            }


        </>

    )
}
const stateToProps = state => {
    return {
        lablist: state.lab.investigations
    };
}
const labresultlistwrap = reduxForm({
    form: "labresultlistform",

})(LabresultlistScreen)
export default connect(stateToProps, { fetchinvestigationlsit })(labresultlistwrap)

