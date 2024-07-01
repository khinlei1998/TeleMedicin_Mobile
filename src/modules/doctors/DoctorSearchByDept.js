import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { fetchstate } from '../../redux/Statereducer';
import RenderSelect from '../ui/DropDownPicker';
import { fetchtownship, killtown } from '../../redux/Townshipreducer';
import Deptrenderselect from '../ui/DepartmentDropdown';
import LanguageDrop from '../ui/LanguageDropdown';

import { fetchdept } from '../../redux/Department';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row } from 'native-base';
import { PHOTO_URL } from '../../components/common';
import { Icon } from 'react-native-elements';
import { fetchalldoctor, get_doctor_by_lng, get_doctor_by_dept, fetchdoc_id, get_all_languages, get_doctor_by_state, get_doctor_by_state_town } from '../../redux/Doctorreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
import { styles } from './Doctorsearchbydep_css';
import { useTranslation } from 'react-i18next';
function DoctorSearchByDept(props) {
    const [selected, setSelected] = useState();
    const [showdoctor, setShowDoctor] = useState(false);
    const [doctorlist, setDoctorList] = useState([])
    const [phone_number, setPhone_Number] = useState()
    const { t, i18n } = useTranslation();
    const [selecteddata, setSelectedData] = useState({})

    useEffect(() => {
        props.fetchstate()
        props.fetchdept()
        props.get_all_languages()
        AsyncStorage.getItem("Phone_no").then((token) => {
            setPhone_Number(token)
        });
        return () => {
            // console.log('unmount')
            props.killtown()
        }

    }, [])

    const searchdoctor = (data) => {
        if (data) {
            let formData = new FormData();
            formData.append('state', data.state ? data.state : '');
            formData.append('township', data.township ? data.township : '');
            formData.append('speciality', data.speciality ? data.speciality : '');
            formData.append('language', data.language ? data.language : '');
            // alert(`here is the value ${JSON.stringify(formData)}`)

            props.get_doctor_by_state_town(formData)
            setShowDoctor(true)


        }
        props.killtown()
        // props.navigation.navigate("Doctorbystate")

    }

    const handletownship = (value) => {
        props.fetchtownship(value)
    }

    const btnProfileDetail = (data) => {
        if (data) {
            props.fetchdoc_id(data.id)

        }
        props.navigation.navigate(t('View Profile'), { paramkey: data });
    }

    const btnbooknow = (id) => {
        if (phone_number) {
            props.navigation.navigate(t('Appointment'), { paramkey: id });
        } else {
            props.navigation.navigate('Login');
        }
    }



    const { get_doc_by_state, alldoctorlist, all_doctors } = props

    const renderdoctor = () => {

        return (
            <>
                {alldoctorlist.length > 0 ?
                    <Container >
                        <Content >
                            <ScrollView>
                                {alldoctorlist.map((result, index) => {
                                    const department_array = [];
                                    const position_array = [];
                                    const work_experience_array = [];

                                    for (const dep in result) {
                                        let dep_array = result.department.split(',');
                                        dep_array.forEach(element => {
                                            department_array.push(element);
                                        });
                                        if (department_array.length > 0) break;
                                    }

                                    for (const pos in result) {
                                        let pos_array = result.position.split(',');
                                        pos_array.forEach(element => {
                                            position_array.push(element);
                                        });
                                        if (position_array.length > 0) break;
                                    }

                                    for (const exo in result) {
                                        let exp_array = result.work_experience.split(',');
                                        exp_array.forEach(element => {
                                            work_experience_array.push(element);
                                        });
                                        if (work_experience_array.length > 0) break;
                                    }

                                    return (
                                        <>

                                            <Card
                                                style={{
                                                    padding: 10,
                                                    marginLeft: 15,
                                                    marginRight: 15,
                                                    marginTop: 20,
                                                    shadowColor: '#000000',
                                                    shadowOffset: { width: 0, height: 10 },
                                                    shadowOpacity: 0.25,
                                                    elevation: 5,
                                                    borderRadius: 10,

                                                }}>
                                                <CardItem >
                                                    <Left>
                                                        <Thumbnail
                                                            source={{
                                                                uri: `${PHOTO_URL}` + result.image,
                                                            }}
                                                        />
                                                        <Body>
                                                            <Text style={{ fontWeight: 'bold' }}>{result.name}</Text>
                                                            <Text style={{ fontWeight: 'bold' }}>{result.dep_data.mm_name}</Text>
                                                            {/* <Text style={{ color: 'gray' }}>{result.work_experience} yrs experience</Text> */}
                                                            {/* <Text style={{ color: 'gray' }}>10000 MMk in 25min</Text> */}
                                                            {department_array.map((dep, d) => {
                                                                return position_array.map((pos, p) => {
                                                                    return work_experience_array.map((exp, e) => {
                                                                        return d == 0 && 0 == p && 0 == e ? (
                                                                            <>
                                                                                <Row
                                                                                    style={{
                                                                                        marginTop: 7,
                                                                                        marginLeft: 12,
                                                                                        marginBottom: 20,
                                                                                    }}
                                                                                >
                                                                                    <Text style={{ fontSize: 13 }}>
                                                                                        {dep + 'ဌာန ' + '|' + pos + "ရာထူး" + '|' + exp + "နှစ်"}
                                                                                    </Text>
                                                                                </Row>
                                                                            </>
                                                                        ) : (
                                                                            <></>
                                                                        );
                                                                    });
                                                                });
                                                            })}

                                                        </Body>
                                                    </Left>
                                                </CardItem>

                                                <CardItem>
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
                                                                // navigation.navigate('Appointment');
                                                                btnbooknow(result.id)
                                                            }}
                                                            style={styles.signButton}>
                                                            <LinearGradient
                                                                colors={["#67a219", "#76b81f"]}
                                                                start={{ x: 0, y: 1 }}
                                                                end={{ x: 1, y: 0 }}
                                                                style={styles.signGradient}
                                                            >
                                                                <Text style={styles.signText}>
                                                                    Book Now
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
                                                        {/* <Button title="Book Now" color="#027536" /> */}
                                                    </Right>
                                                </CardItem>
                                            </Card>


                                        </>
                                    )

                                }
                                )}

                            </ScrollView>
                        </Content>
                    </Container>
                    :
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
                        titleText="Select State"
                        oldvalue="Select State"
                    />
                </View>

                <View style={styles.dropStyle}>
                    <Field
                        name="township"
                        getvalue={selected}
                        component={RenderSelect}
                        options={props.all_township}
                        setValue={setSelected}
                        // onChange={handletownship} 
                        titleText=" Select Township"
                        oldvalue="Select Township"


                    />
                </View>

                {/* <View style={{ flex: 1, flexDirection: 'row' }}> */}
                <View style={styles.dropStyle}>
                    <Field
                        name="speciality"
                        getvalue={selected}
                        component={Deptrenderselect}
                        options={props.all_depts}
                        setValue={setSelected}
                        // onChange={handletownship} 
                        titleText="Select Department"
                        oldvalue="Select Department"

                    />
                </View>

                <View style={{
                    width: '60%', marginTop: 10,
                    color: 'white', marginLeft: 15
                }}>
                    <Field
                        name="language"
                        getvalue={selected}
                        component={LanguageDrop}
                        options={props.all_languages}
                        setValue={setSelected}
                        // onChange={handletownship} 
                        titleText="Select Language"
                        oldvalue="Select Language"

                    />
                </View>



                <TouchableOpacity style={styles.searchbutton} onPress={props.handleSubmit(searchdoctor)} >
                    <LinearGradient
                        colors={["#4a8dcb", "#028fdd"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.SearchGradient}
                    >
                        <Text style={styles.signText}>{t("Search Doctor")}</Text>
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
                {showdoctor && renderdoctor()}

            </View>
        </>
    )
}


const stateToProps = state => {
    return {
        all_states: state.state.states,
        all_township: state.township.townships,
        all_depts: state.dept.depts,
        // doctorlist_by_dept: state.doctor_by_depts.doctor_by_dept,
        get_doc_by_state: state.doctor_by_depts.doc_by_state_town,
        all_languages: state.doctor_by_depts.languages,
        alldoctorlist: state.doctor_by_depts.doc_by_state,
        all_doctors: state.doctor_by_depts.all_doctor


    };
}
const DoctorSearchByDeptwrap = reduxForm({
    form: "DoctorSearchByDeptForm",
    // validate

})(DoctorSearchByDept)
export default connect(stateToProps, { killtown, fetchalldoctor, get_doctor_by_lng, get_doctor_by_dept, get_doctor_by_state_town, get_doctor_by_state, fetchstate, fetchtownship, fetchdept, fetchdoc_id, get_all_languages })(DoctorSearchByDeptwrap)

