import axios from "axios";
export const LOGED_USER = "LOGED_USER"
export const KILLED_USER = "KILLED_USER"
import { BASE_URL } from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_DATA = {
    datas: [

    ]
}
const Saveauth = async (access_token) => {
    try {
        await AsyncStorage.setItem('Auth_Key', access_token);

    } catch (e) {

    }
}

const Savephoneno = async (phoneno) => {
    try {
        await AsyncStorage.setItem('Phone_no', phoneno);
    } catch (e) {

    }
}

export function fetchlogin(props, callback = () => { }) {
    var loginsuccess = 'loginsuccess';
    var loginerror = 'loginerror';
    return (dispatch) => {
        axios.post(`${BASE_URL}/patient/patient_login`, props)
            .then(({ data }) => {
                if (data.status === "success") {
                    Saveauth(data.access_token)
                    Savephoneno(data.data.phone_number)
                    dispatch({
                        type: LOGED_USER,
                        payload: data.data,
                    });
                    callback(loginsuccess)
                } else {
                    callback(loginerror);
                }
            })
            .then(error => console.log(error));
    }
}

export function killuser(props, callback = () => { }) {

    return (dispatch) => {
        dispatch({
            type: KILLED_USER,

        });
    }
}

export default function Loginreducer(state = LOGIN_DATA, action) {

    switch (action.type) {
        case LOGED_USER:
            return { ...state, datas: action.payload };
        case KILLED_USER:
            return LOGIN_DATA;
        default:
            return state
    }
}