
import axios from "axios";
export const FETCH_PATIENT_BY_PHONENO = 'FETCH_PATIENT_BY_PHONENO'
export const KILLED_USER = 'KILLED_USER'
export const RESET_STORE = 'RESET_STORE';
export const FETCH_INVESTIGATION='FETCH_INVESTIGATION';
export const FETCH_APP_BY_PHONE = 'FETCH_APP_BY_PHONE';
export const FETCH_PATIENTNO_BY_FORGOT = 'FETCH_PATIENTNO_BY_FORGOT'
import appReducer from "./reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../components/common';
const patient = {
    patient_by_phoneno: {},
    app_by_phoneno: [],
    phoneno_forget:{}
}
export function fetchpatientbyphoneno(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/patient_by_phone/${values}`, {
            responseType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await AsyncStorage.getItem("Auth_Key")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_PATIENT_BY_PHONENO,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function fetchphonenobyforget(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient_by_phone_forget/${values}`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_PATIENTNO_BY_FORGOT,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function fetchappointmentbyphoneno(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/appointment_by_phone/${values}`, {
            responseType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await AsyncStorage.getItem("Auth_Key")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_APP_BY_PHONE,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function killuser(props, callback = () => { }) {

    return (dispatch) => {
        dispatch({
            type: KILLED_USER,

        });
    }
}

export default function patientreducer(state = patient, action) {

    switch (action.type) {

        case FETCH_PATIENT_BY_PHONENO:
            return { ...state, patient_by_phoneno: action.payload };
        case FETCH_APP_BY_PHONE:
            return { ...state, app_by_phoneno: action.payload };
        case FETCH_PATIENTNO_BY_FORGOT:
            return { ...state, phoneno_forget: action.payload };


        case KILLED_USER:
            return patient
        case RESET_STORE:
            return appReducer(undefined, action)
        default:
            return state
    }
}

