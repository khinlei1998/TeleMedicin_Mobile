import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { fetchstate } from '../../../redux/Statereducer';
import { fetchtownship } from '../../../redux/Townshipreducer';
import RenderSelect from '../../ui/DropDownPicker';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row } from 'native-base';
import { PHOTO_URL, nodataIcon } from '../../../components/common';
import { fetchclinic_by_state } from '../../../redux/Clinicreducer';
import { useTranslation } from 'react-i18next';
import LottieView from "lottie-react-native";
import { killtown } from '../../../redux/Townshipreducer';

function ClinicList(props) {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState();
    const [showclinic, setShowClinic] = useState(false);
    useEffect(() => {
        return () => {
            props.killtown()
        }
    }, [])

    const searchclinic = (data) => {
        if (data) {
            let formData = new FormData();
            formData.append('state', data.state ? data.state : '');
            formData.append('township', data.township ? data.township : '');
            props.fetchclinic_by_state(formData)

            setShowClinic(true)
        }
        props.killtown()

    }

    const handletownship = (value) => {
        props.fetchtownship(value)
    }

    const renderclinic = () => {
        return (
            <>

                {props.clinic_list && props.clinic_list.length > 0 ?
                    <Container style={{ backgroundColor: 'white' }}>
                        <Content>
                            <ScrollView>
                                {props.clinic_list.map((result, index) => {
                                    return (
                                        <>
                                            <Card style={{
                                                padding: 10,
                                                marginLeft: 15,
                                                marginRight: 15,
                                                marginTop: 10,
                                                shadowColor: '#000000',
                                                shadowOffset: { width: 0, height: 10 },
                                                shadowOpacity: 0.25,
                                                elevation: 5,
                                                borderRadius: 10,
                                            }} key={index}>
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail
                                                            source={{
                                                                uri: `${PHOTO_URL}` + result.image,
                                                            }}
                                                        />

                                                        <Body>
                                                            <Text style={{ fontWeight: 'bold' }}>{result.clinic_name}</Text>
                                                            <Text style={{ fontWeight: 'bold' }}>{result.email}</Text>
                                                            <Text style={{ fontWeight: 'bold' }}>{result.phone_number}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>

                                                {/* <CardItem>
                                                    <Left>
                                                        <TouchableOpacity
                                                            onPress={() => {

                                                                btnProfileDetail(result)
                                                            }}
                                                            style={styles.signButton}>
                                                            <LinearGradient
                                                                colors={["#36afb9", "#36afb9"]}
                                                                start={{ x: 0, y: 1 }}
                                                                end={{ x: 1, y: 0 }}
                                                                style={styles.signGradient}
                                                            >
                                                                <Text style={styles.signText}>
                                                                    View Profile
                                                                    <Icon
                                                                        name='eye'
                                                                        type='font-awesome'
                                                                        color='#fff'
                                                                        alignSelf='center'
                                                                        style={{ height: 12, marginLeft: 5 }}
                                                                        size={13} />

                                                                </Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                    </Left>

                                                    <Right>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                btndoctorlist(result.id)
                                                            }}
                                                            style={styles.signButton}>
                                                            <LinearGradient
                                                                colors={["#67a219", "#76b81f"]}
                                                                start={{ x: 0, y: 1 }}
                                                                end={{ x: 1, y: 0 }}
                                                                style={styles.signGradient}
                                                            >
                                                                <Text style={styles.signText}>
                                                                    Doctor List
                                                                    <Icon
                                                                        name='calendar'
                                                                        type='font-awesome'
                                                                        color='#fff'
                                                                        alignSelf='center'
                                                                        style={{ height: 12, marginLeft: 5 }}
                                                                        size={14} />

                                                                </Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                    </Right>
                                                </CardItem> */}

                                            </Card>
                                        </>
                                    )
                                })}


                            </ScrollView>
                        </Content>
                    </Container>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <LottieView
                            source={require("../../../../assets/images/datanotfound.json")}
                            style={styles.lottie}
                            autoPlay
                        />
                    </View>
                }
            </>
        )
    }

    const renderselect = () => {
        return (
            <View>
                <View style={styles.dropStyle}>
                    <Field
                        name="state"
                        getvalue={selected}
                        component={RenderSelect}
                        options={props.all_states}
                        setValue={setSelected}
                        onChange={(value) => handletownship(value)}
                        titleText={t("Select State")}
                        oldvalue="Select State"
                        label="gg"
                    />
                </View>

                <View style={{
                    width: '60%', marginTop: 10,
                    color: 'white', marginLeft: 15
                }}>
                    <Field
                        name="township"
                        getvalue={selected}
                        component={RenderSelect}
                        options={props.all_township}
                        setValue={setSelected}
                        // onChange={handletownship} 
                        titleText={t("Select Township")}
                        oldvalue="Select Township"


                    />
                </View>

                <TouchableOpacity style={styles.searchbutton} onPress={props.handleSubmit(searchclinic)} >
                    <LinearGradient
                        colors={["#4a8dcb", "#028fdd"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.SearchGradient}
                    >
                        <Text style={styles.signText}>{t("Search Clinic")}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                {/* </View> */}


            </View>
        )
    }

    return (
        <>
            {/* {!showdoctor && ()} */}

            {renderselect()}

            <View style={{ flex: 1 }}>
                {showclinic && renderclinic()}

            </View>
        </>
    )
}
const stateToProps = state => {
    return {
        all_states: state.state.states,
        all_township: state.township.townships,
        clinic_list: state.clinic.clinic_by_state
        // get_doc_by_state: state.doctor_by_depts.doc_by_state_town

    };
}
const ClinicListwrap = reduxForm({
    form: "ClinicListForm",
    // validate

})(ClinicList)
export default connect(stateToProps, { killtown, fetchstate, fetchtownship, fetchclinic_by_state })(ClinicListwrap)

const styles = StyleSheet.create({

    dropStyle: {
        width: '90%',
        marginTop: 10,
        color: 'white',
        marginLeft: 15,
        // marginRight: 10
    },
    searchbutton: {
        width: '30%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 21
        // marginLeft: 5
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    SearchGradient: {

        height: 45,
        width: '100%',
        borderRadius: 10,
        marginLeft: 7,
        justifyContent: "center",
        marginTop: 20,
        alignContent: 'center',
        textAlign: 'center',
    },
    signButton: {
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
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
    itemImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginTop: 14
    },
})
