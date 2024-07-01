import axios from "axios";
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FETCH_SIGNUPDATA = 'FETCH_SIGNUPDATA'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image_Uplaod } from "../components/common";

const created_user = {
    user: [

    ],
    patientdata: {}
}
const Savesignedphoneno = async (phone_number) => {
    try {
        await AsyncStorage.setItem('Phone_no', phone_number);
        const value = await AsyncStorage.getItem('Phone_no')
    } catch (e) {
        console.log(e);
    }
}

const Saveauthtoken = async (token) => {
    try {
        await AsyncStorage.setItem('Auth_Key', token);

    } catch (e) {
        console.log(e);
    }
}

export function fetchsignupdata(data) {
    return {
        type: FETCH_SIGNUPDATA,
        payload: data
    }
}



export function createuser(values, callback = () => { }) {
    var signupsuccess = 'signupsuccess';
    var signuperror = 'signuperror';
    return (dispatch) => {
        let formData = new FormData();
        formData.append('address', values.address ? values.address : '');
        formData.append('gender', values.gender);
        formData.append('name', values.name);
        formData.append('password', values.password);
        formData.append('phone_number', values.phone_number);
        formData.append('register_date', values.register_date);
        formData.append('state', values.state ? values.state : '');
        formData.append('township', values.township ? values.township : '');
        formData.append('date_of_birth', values.date_of_birth);
        formData.append('devicetoken', values.devicetoken);
        values.image && values.image.fileName ?
            formData.append('image', {
                name: values.image.fileName,
                type: values.image.type,
                uri:
                    Platform.OS === "android" ? values.image.uri : values.image.uri.replace("file://", "")
            })
            :
            formData.append('image', '');
        axios.post(`${BASE_URL}/patient/patient_register`, formData, Image_Uplaod)
            .then(({ data }) => {
                if (data.status === "success") {
                    Savesignedphoneno(data.data.phone_number)
                    Saveauthtoken(data.access_token)
                    callback(signupsuccess);
                } else {
                    callback(signuperror);
                }

            })
            .then(error => console.log('error', error));
    }
}

export function updateuser_by_otp(values, test, callback = () => { }) {
    const updatesuccess = 'updatesuccess'
    const updateerror = 'updateerror'
    return async (dispatch) => {
        let formData = new FormData();

        formData.append('address', test.address);
        formData.append('age', test.age);
        formData.append('gender', test.gender == 'undefined' ? '' : test.gender);
        formData.append('name', test.name);
        formData.append('password', values.password);
        formData.append('phone_number', test.phone_number);
        formData.append('register_date', test.register_date);
        formData.append('state', test.state);
        formData.append('township', test.township);
        formData.append('image', test.image)
        axios.post(`${BASE_URL}/update_patient_by_otp`, formData)
            .then(({ data }) => {
                if (data.status === "success") {
                    callback(updatesuccess)
                } else {
                    callback(updateerror);
                }
            })
            .then(error => console.log('error', error));
    }
}

export function updateuser(values, callback = () => { }) {

    const updatesuccess = 'updatesuccess'
    const updateerror = 'updateerror'
    return async (dispatch) => {
        let formData = new FormData();
        formData.append('address', values.address);
        formData.append('age', values.age);
        formData.append('gender', values.gender == null ? '' : values.gender);
        formData.append('name', values.name);
        formData.append('password', values.password);
        formData.append('phone_number', values.phone_number);
        formData.append('register_date', values.register_date);
        formData.append('state', values.state);
        formData.append('township', values.township);
        values.image && values.image.fileName ?
            formData.append('image', {
                name: values.image.fileName,
                type: values.image.type,
                uri:
                    Platform.OS === "android" ? values.image.uri : values.image.uri.replace("file://", "")
            })
            :
            formData.append('image', '')
        axios.post(`${BASE_URL}/patient/patient_image`, formData, {
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data;',
                "Authorization": await AsyncStorage.getItem("Auth_Key")
            }
        })
            .then(({ data }) => {
                if (data.status === "success") {
                    callback(updatesuccess)
                } else {
                    callback(updateerror);
                }
            })
            .then(error => console.log('error', error));
    }
}
export default function Signupreducer(state = created_user, action) {

    switch (action.type) {
        case CREATE_USER:
            return { ...state, user: action.payload };
        case FETCH_SIGNUPDATA:
            return { ...state, patientdata: action.payload }
        default:
            return state
    }
}