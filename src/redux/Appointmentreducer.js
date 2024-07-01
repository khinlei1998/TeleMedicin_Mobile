import axios from "axios";
export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT'
export const FETCH_APPOINTMENT = 'FETCH_APPOINTMENT'
export const FETCH_APPOINTMENT_BY_PHONE = 'FETCH_APPOINTMENT_BY_PHONE'
export const FETCH_DOC_AVAILABLE = 'FETCH_DOC_AVAILABLE'
export const FETCH_TRANSLATION = 'FETCH_TRANSLATION'
export const FETCH_PAYMENTLIST = 'FETCH_PAYMENTLIST'


import { BASE_URL, DEFAULT_CONFIG, Image_Uplaod } from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initial_appointment = {
    appointments: [],
    appointment_by_phoneno: [],
    available_time: [],
    all_payments: [],
    paymentlist: []
}

export function fetchappointment(callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/appointment`,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )
            .then(({ data }) => {

                dispatch({
                    type: FETCH_APPOINTMENT,
                    payload: data.data,
                });

                // callback(data.data);
            })
            .then(error => console.log(error));
    }
}

export function fetchappointmentBytranslationlist(phone_no, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/appointment_By_translation/${phone_no}`,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )
            .then(({ data }) => {
                console.log(data.data);

                dispatch({
                    type: FETCH_PAYMENTLIST,
                    payload: data.data,
                });

                // callback(data.data);
            })
            .then(error => console.log(error));
    }
}


export function createappointment(props, callback = () => { }) {
    const starttime = props.doc_available.split('-')
    // alert(`here is the value ${JSON.stringify(props)}`)
    var Appcreatesuccess = 'Appcreatesuccess';
    var Appcreateerror = 'Appcreateerror';
    return async (dispatch) => {
        let formData = new FormData();

        formData.append('allDay', props.allDay);
        formData.append('doctor_id', props.doctor_id);
        formData.append('end_time', starttime[1]);
        formData.append('title', props.title);
        props.image ?
            formData.append('photo', {
                name: props.image.fileName,
                type: props.image.type,
                uri:
                    Platform.OS === "android" ? props.image.uri : props.image.uri.replace("file://", "")
            })
            :
            formData.append('photo', '')
        formData.append('notes', props.notes);
        formData.append('patient_name', props.patient_name);
        formData.append('patient_ph_number', props.patient_phoneno);
        formData.append('service_id', props.service_id);
        formData.append('start_time', starttime[0]);
        formData.append('sympton', props.symptom);
        formData.append('start_date', props.startDate);
        formData.append('user_id', props.user_id);
        formData.append('appointment_confirm', props.appointment_confirm)
        formData.append('gender', props.p_gender)
        formData.append('type', 'mobile')
        formData.append('read_sts', 0)
        if (props.p_name && props.dob) {
            formData.append('name', props.p_name)
            formData.append('date_of_birth', props.dob)
        }
        else if (props.exist_patient) {
            formData.append('sub_patient_id', props.exist_patient)

        }
        axios.post(`${BASE_URL}/patient/appointment_create_mobile`, formData, {

            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data;',
                "Authorization": await AsyncStorage.getItem("Auth_Key")
            }
        })
            .then(({ data }) => {
                console.log('data', data);
                if (data) {
                    dispatch({
                        type: CREATE_APPOINTMENT,
                        payload: data.data,
                    });
                    callback(data)
                } else {
                    callback(Appcreateerror);

                }

            })
            .then(error => console.log(error));
    }
}

export function fetchavailable(callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/available_time`,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )
            .then(({ data }) => {
                console.log('fetchavailable', fetchavailable)

                dispatch({
                    type: FETCH_DOC_AVAILABLE,
                    payload: data.data,
                });

                callback(data.data);
            })
            .then(error => console.log(error));
    }
}

export function fetch_paymenttranslation(callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/payment_translation`,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )
            .then(({ data }) => {
                console.log('FETCH_TRANSLATION', data)

                dispatch({
                    type: FETCH_TRANSLATION,
                    payload: data.data,
                });

                callback(data.data);
            })
            .then(error => console.log(error));
    }
}

export default function Appointmentreducer(state = initial_appointment, action) {

    switch (action.type) {
        case CREATE_APPOINTMENT:
            return { ...state, appointments: action.payload };
        case FETCH_APPOINTMENT:
            return { ...state, appointment_by_phoneno: action.payload };
        case FETCH_DOC_AVAILABLE:
            return { ...state, available_time: action.payload };
        case FETCH_TRANSLATION:
            return { ...state, all_payments: action.payload };
        case FETCH_PAYMENTLIST:
            return { ...state, paymentlist: action.payload };
        default:
            return state
    }
}