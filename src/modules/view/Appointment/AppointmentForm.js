import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import Textinput from '../../ui/TextInput';
import { Field, reduxForm } from 'redux-form'
import { Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import { connect } from "react-redux";
import Consulation_selectbox from '../../ui/Consulation_selectbox';
import Textarea from '../../ui/Textarea';
import RenderImage from '../../ui/RenderImage';
import { createappointment, fetchavailable, fetchappointment } from '../../../redux/Appointmentreducer';
import validate from './validate';
import SweetAlert from 'react-native-sweet-alert';
import { fetchpatientbyphoneno } from '../../../redux/Patientreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import Timeslot from '../../ui/Timeslot';
import moment from "moment";
import CollapsibleList from "react-native-collapsible-list";
import RenderSelect from '../../ui/DropDownPicker';
import PatientSelect from '../../ui/PatientDropdown';
import { fetchgender } from '../../../redux/genderreducer';
import NotificationService from '../../../utils/NotificationService';
import DatePickerInput from '../../ui/DatePicker';
import { RadioButton } from 'react-native-paper';

const AppointmentForm = (props) => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [availabletime, setAvailableTime] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalimageVisible, setimageVisible] = useState(false)
    const [appdate, setAppDate] = useState()
    const [selected, setSelected] = useState()
    const [patient_name, setPatientName] = useState()

    //Image
    const [resourcePath, setfilePath] = useState({});
    const [fileData, setfileData] = useState();
    const [fileUri, setfileUri] = useState();
    const [filetype, setfiletype] = useState();
    const [dateofbirth, setDateofbirth] = useState()
    const [gender, setGender] = useState()

    useEffect(() => {
        navigation.addListener('focus', () => {
            AsyncStorage.getItem("Phone_no").then((token) => {
                if (token) {
                    props.fetchappointment(token)
                    props.fetchpatientbyphoneno(token)
                    props.fetchgender()

                }
            })
        })
    })

    const id = props.route.params.paramkey
    const filtered_doctor = props.all_doc_available_time.filter((value) => value.doctor_id == id)
    const { handleSubmit, user_id, patient_by_phone } = props
    const [startdateisDatePickerVisible, setstartDatePickerVisibility] = useState(false);
    const [startdate, setstartDate] = useState('');
    //end date
    const [endateisDatePickerVisible, setendDatePickerVisibility] = useState(false);
    const [enddate, setendDate] = useState('');
    //  End time
    const [endtime, endsetDate] = useState(new Date(1598051730000));
    const [endmode, endsetMode] = useState('date');
    const [endshowtest, endsetShow] = useState(false);
    const [spinner, setclosespinner] = useState(false);

    const endtimeonChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // console.log('currentDate',currentDate)
        endsetShow(Platform.OS === 'ios');
        endsetDate(currentDate);
    };

    const endshowMode = (currentMode) => {
        endsetShow(true);
        endsetMode(currentMode);
    };

    const showEndTimepicker = () => {
        endshowMode('time');
    };

    //Start time
    const [starttime, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('');
    const [showtest, setShow] = useState(false);
    const [subpatient, setSubpatient] = useState("1")


    const starttimeonChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    const showStartTimepicker = () => {
        showMode('time');
    };

    // Start Date
    const startdateshowDatePicker = () => {
        setstartDatePickerVisibility(true);
    };

    const startdatehandleConfirm = (date) => {
        setstartDate(date)
        startdatehideDatePicker();
    };
    const startdatehideDatePicker = () => {
        setstartDatePickerVisibility(false);
    };
    //End Date
    const endateshowDatePicker = () => {
        setendDatePickerVisibility(true);
    };

    const endatehandleConfirm = (date) => {
        setendDate(date)
        endatehideDatePicker();
    };
    const endatehideDatePicker = () => {
        setendDatePickerVisibility(false);
    };


    const btntime = (value, result) => {
        setAvailableTime(value)
        setAppDate(result)
        setModalVisible(false);


    }
    const showmodal = () => {
        props.fetchavailable()

        setModalVisible(!modalVisible)
    }
    const hidemodal = () => {
        setModalVisible(false)
    }

    const imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };

        launchImageLibrary(options, (res) => {
            // console.log('Response = ', res.uri);
            if (res.didCancel) {
                // console.log('User cancelled image picker');
            } else if (res.error) {
                // console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                const source = { uri: res.fileName };
                // console.log('res', res);
                setfilePath(res);
                setfileData(res.assets[0]);
                setfileUri(res.assets[0].uri)
                setfiletype(res.assets[0].type)

            }
        });
        setimageVisible(!modalimageVisible)
    }

    const camera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (res) => {
            const requestCameraPermission = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: "App Camera Permission",
                            message: "App needs access to your camera ",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Camera permission given");
                    } else {
                        console.log("Camera permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            };


            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                const source = { uri: res.fileName };
                setfilePath(res);
                setfileData(res.assets[0]);
                setfileUri(res.assets[0].uri);
                setfiletype(res.assets[0].type)
            }
        });
        setimageVisible(!modalimageVisible)
    }
    //consult select box
    const [value, setValue] = useState('first');
    const consult_change = (value) => {
        setValue(value)
    }

    const sendNotification = async (data) => {
        let notificationData = {
            title: 'Appointment Notification',
            body: `You have an appointment at ${data.startTime} on ${data.startDate}`,
            // token:
            //     'dkWja3nkQYiEQa_-WDXcHk:APA91bE7F90wpiWUWnGNFf6tcxBJrNBMmdP1h8GXczWo8niSgJVk26zuONLXkHPm8qMAiv5R7NRYys_zN8IgBxxv2c-gbfl-wK4GzRwLrGjXQ_InajzNH9cclkcbDcY1GR7oNf76rvQ5',
            token: await AsyncStorage.getItem('device_token')
        };
        await NotificationService.sendSingleDeviceNotification(notificationData);
    };



    const onSubmit = (values) => {

        const data = values
        data.allDay = 1
        data.user_id = patient_by_phone.id
        data.patient_phoneno = patient_by_phone.phone_number
        data.patient_name = patient_by_phone.name
        data.appointment_confirm = 2
        data.doctor_id = id
        data.startDate = appdate
        props.createappointment(data, (callbackdata) => {
            if (callbackdata.data) {
                setclosespinner(false)
                SweetAlert.showAlertWithOptions({
                    title: "Appointment Successfully",
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                },
                    callback => console.log('callback'));
                props.navigation.navigate(t('Home'));
                sendNotification(callbackdata.data)
            } else {
                setclosespinner(false)
                SweetAlert.showAlertWithOptions({
                    title: 'Appointment  Create Fail',
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
    // image upload
    const modalvisibile = () => {

        setimageVisible(true)
    }
    let re = []
    for (let i = 0; i < 4; i++) {
        //get next 4days
        var dateFrom = moment().add(i, 'd').format('YYYY-MM-DD');
        filtered_doctor.map((value) => {
            if (dateFrom == value.date) {
                re.push(value)
            }
        })


    }


    const arr1 = re.map((value) => {
        const starttime = moment(value.from, 'hh:mm A')
        const endtime = moment(value.to, 'hh:mm A')
        if (endtime.isBefore(starttime)) {
            endtime.add(1, 'day')
        }
        const arr = []
        while (starttime <= endtime) {
            let obj = {}
            arr.push(new moment(starttime).format('hh:mm A'));
            starttime.add(20, 'minutes')
        }

        let finale = []
        let newobj = {}
        for (var j = 0; j < arr.length; j++) {
            let array_length = arr.length - 1;
            if (j != 0) { let test = [] }
            if (array_length > j) {

                finale.push([arr[j] + '-' + arr[j + 1]])
                newobj[value.date] = finale

            }
        }
        return newobj
    })
    const filtered_app = props.all_appointment.filter((value) => value.doctor_id == id)
    const newArray = []
    for (let i = 0; i < filtered_app.length; i++) {
        if (filtered_app[i].sub_patient_info) {
            newArray.push(filtered_app[i])
        }

    }

    var app_result_list = filtered_app.reduce((r, a) => {

        r[a.startDate] = r[a.startDate] || [];
        r[a.startDate].push([a.startTime + '-' + a.endTime]);
        return r;
    }, Object.create(null));


    const key_array = [];
    arr1.map((value) => {
        Object.keys(value).map(function (result, resultkey) {
            const doc_length = Object.keys(value[result]);
            let newarray = []
            for (let i = 0; i < doc_length.length; i++) {
                Object.keys(app_result_list).map(function (app_result) {
                    const app_length = Object.keys(app_result_list[app_result]);
                    for (let j = 0; j < app_length.length; j++) {
                        if (result == app_result) {
                            Object.keys(value[result][i]).map(function (findoc) {
                                Object.keys(app_result_list[app_result][j]).map(function (finapp) {
                                    if (value[result][i][findoc] == app_result_list[app_result][j][finapp]) {
                                        let newobjt = {}
                                        newobjt[app_result] = app_result_list[app_result][j][finapp]
                                        key_array.push(newobjt)
                                    }

                                })
                            })
                        }

                    }


                })


            }




        })
    })


    let finalestate = []
    arr1.map((value) => {
        Object.keys(value).map(function (result) {
            key_array.map((key_array_value) => {
                Object.keys(key_array_value).map(function (data) {
                    if (result == data) {
                        Object.keys(value[result]).map(function (z) {
                            Object.keys(value[result][z]).map(function (a) {
                                if (key_array_value[data] == value[result][z][a]) {
                                    delete value[result][z][a]
                                    finalestate.push(value)

                                } else {
                                }
                            })


                        })

                    }
                })
            })
        })
    })
    const get_dob = (id) => {
        // alert(id)
        // newArray.filter((val) => val.sub_patient_info.name == name ?
        //     setDateofbirth(val.sub_patient_info.date_of_birth) 
        //     setGender(val.sub_patient_info.sub_patient_gender_data.name) : '')
        for (var i = 0; i < newArray.length; i++) {

            if (newArray[i].sub_patient_info.id == id) {
                setDateofbirth(newArray[i].sub_patient_info.date_of_birth)
                setGender(newArray[i].sub_patient_info.sub_patient_gender_data.name)
            }



        }

    }
    return (
        <View >
            <ScrollView style={{ backgroundColor: 'white' }}>

                <View style={{ marginTop: 20 }}>
                    <Field name="title" iconname="info" label={t("Chief Complaint")} component={Textinput} placeholder={'Enter Chief Complaint'} />
                </View>

                <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={{
                        flex: 1,
                        marginTop: 20,
                        overflow: "hidden",
                        backgroundColor: "#FFF",
                        borderRadius: 5
                    }}
                    buttonContent={
                        <View>
                            <Text style={{ color: 'black', marginLeft: 13, }}>+</Text>
                        </View>
                    }
                >
                    <View style={{
                        borderColor: "#CCC",
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }}>{t("If you are making an appointment on behalf of the patient, Please Fill out this form.")}</Text>
                    </View>
                    <RadioButton.Group onValueChange={e => setSubpatient(e)} value={subpatient} >
                        {/* */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontFamily: 'Quicksand-Regular' }}>New?</Text>
                                <RadioButton value="1" />
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ color: 'black', fontFamily: 'Quicksand-Regular' }}>Existing?</Text>
                                <RadioButton value="2" />
                            </View>
                        </View>

                    </RadioButton.Group>

                    {subpatient == 1 ?
                        <>
                            <View style={{ marginTop: 5 }}>
                                <Field name="p_name" iconname="info" label={t("Patient Name")} component={Textinput} placeholder={'Enter Patient Name'} />
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Field
                                    visible={startdateisDatePickerVisible}
                                    onConfirm={startdatehandleConfirm}
                                    gatvalue={startdate}
                                    showdate={startdateshowDatePicker}
                                    hidedate={startdatehideDatePicker}
                                    name="dob"
                                    label={t("Date Of Birth")}
                                    component={DatePickerInput} />

                            </View>

                            <View style={{
                                borderRadius: 30,
                                marginTop: 15,
                                width: '96%',
                                marginLeft: 12
                            }}>
                                <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>{t("Please Choose Gender")}</Text>

                                <Field
                                    name="p_gender"
                                    getvalue={selected}
                                    component={RenderSelect}
                                    options={props.all_gender}
                                    setValue={setSelected}
                                    titleText={t("Please select Gender")}

                                />
                            </View>

                        </>
                        :
                        <>
                            <View style={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                borderRadius: 30,
                                marginTop: 15,
                                width: '94%',
                                marginLeft: 12,
                                marginRight: 12
                            }}>
                                <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Please Choose Patient Name</Text>
                                <Field
                                    name="exist_patient"
                                    getvalue={patient_name}
                                    component={PatientSelect}
                                    options={newArray}
                                    setValue={setPatientName}
                                    onChange={get_dob}
                                    titleText="Please select Patient Name"


                                />


                            </View>
                            <Field disabled oldvalue={dateofbirth ? dateofbirth : ''} name="exist_dob" iconname="user" label="Date of Birth" component={Textinput} placeholder={'Date of Birth'} />

                            <Field disabled oldvalue={gender ? gender : ''} name="exist_gender" iconname="user" label="Gender" component={Textinput} placeholder={'Gender'} />
                        </>}


                </CollapsibleList>

                <View>

                    <View>
                        <Field finalestate={arr1} filtered_doctor={filtered_doctor} hidemodal={hidemodal} showmodal={showmodal} name="doc_available" component={Timeslot} btntime={btntime} availabletime={availabletime} modalVisible={modalVisible} timeslotlabel={t("Appointment Time Slot")} />
                    </View>


                    <View>

                        <Field name="notes" component={Textarea} placeholder={t("Note")} />

                    </View>

                    <View>
                        <Field consultlabel={t("Select Consultation Method")} name="service_id" consult_change={consult_change} datavalue={value} component={Consulation_selectbox} />
                    </View>
                    <View>
                        <Field name="symptom" component={Textarea} placeholder={t("Write the symptoms")} />

                    </View>


                    <View>
                        <Field type="file" label={t("Select medical record photo or X-Ray photo")} modalVisible={modalVisible} modalvisibile={modalvisibile} fileData={fileData} camera={camera} fileUri={fileUri} name="image" imageGalleryLaunch={imageGalleryLaunch} component={RenderImage} />
                    </View>


                    <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onSubmit)} >
                        <LinearGradient
                            colors={["#67a219", "#76b81f"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.signGradient}
                        >
                            <Text style={styles.signText}>{t("Book Now")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                        {spinner ?
                            <Spinner
                                visible={spinner}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                            :
                            <Text></Text>
                        }
                    </View>

                </View>
            </ScrollView>
        </View>

    );
}

const stateToProps = state => {
    return {
        patient_by_phone: state.patient.patient_by_phoneno,
        all_doc_available_time: state.appointment.available_time,
        all_appointment: state.appointment.appointment_by_phoneno,
        all_gender: state.gender.genders
    };
}

const Appformwrapp = reduxForm({
    form: "AppointmentRegister",
    validate

})(AppointmentForm)
export default connect(stateToProps, { fetchgender, fetchappointment, createappointment, fetchpatientbyphoneno, fetchavailable })(Appformwrapp)


const styles = StyleSheet.create({
    titletext: {
        textAlign: "center",
        marginBottom: 15,
        marginTop: 10,
        fontSize: 17,
        width: 280,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    signGradient: {
        height: 50,
        borderRadius: 2,
        justifyContent: "center",
        shadowColor: "#76b81f",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonImageIconStyle: {
        paddingTop: 2,
        height: 60,
        width: 60,
        resizeMode: 'cover',
    },
    labelStyle: {
        marginBottom: 6,
        fontSize: 13,
    },

    signButton: {
        width: "100%",
        marginVertical: 7,
        paddingHorizontal: 9,
    },
    filebutton: {
        width: "50%",
        marginVertical: 7,
        paddingHorizontal: 9,
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,

    },
    desc: {
        borderRadius: 8,
        borderWidth: 1,
        height: Platform.OS === "ios" ? 60 : 80,
        fontSize: 16,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        padding: 10,
        marginTop: 8,
        borderColor: '#c9c5c5'
    },
    itemImage: {
        height: 40,
        width: 40,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    //Image 
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    labelStyle: {
        marginBottom: 6,
        fontSize: 13,
    },
    inputContainerStyle: {
        borderWidth: 0.8,
        borderColor: "#c9c9c9",
        borderRadius: 15,
        height: 50,
    },
    leftIconContainerStyle: {
        height: 25,
        width: '30%',
        borderRightWidth: 0.8,
        borderColor: "#c9c9c9",
    },
    cardcotainer: {
        width: '100%',
        height: 120,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }


})
