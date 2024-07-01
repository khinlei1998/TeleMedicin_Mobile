import axios from "axios";
export const FETCH_INVESTIGATION = 'FETCH_INVESTIGATION'
export const MULTIPLE_UPLOAD = 'MULTIPLE_UPLOAD'
export const FETCH_LABRESULT = 'FETCH_LABRESULT'
export const FETCH_RADIOLOGY = 'FETCH_RADIOLOGY'
export const FETCH_LABRESULT_ATTACH = 'FETCH_LABRESULT_ATTACH'

import { BASE_URL } from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const get_lab = {
    investigations: [

    ],
    lab_result: [],
    radiology_data: []
}
export function fetch_labresult_attachment(code) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/lab/get_labresult_attach/${code}`,
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
                    type: FETCH_LABRESULT_ATTACH,
                    payload: data.data,
                });

            })
            .then(error => console.log(error));
    }
}
export function fetchinvestigationlsit() {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/investigation`,
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
                    type: FETCH_INVESTIGATION,
                    payload: data.data,
                });

            })
            .then(error => console.log(error));
    }
}

export function patientuploadImage(value, patient, callback = () => { }) {
    var labsuccess = 'labsuccess';
    var laberror = 'laberror';
    return async (dispatch) => {
        let formData = new FormData();
        formData.append('id', patient.id)
        formData.append('date_of_birth', patient.date_of_birth)
        formData.append('drug_allergy', patient.drug_allergy)
        formData.append('drug_hist', patient.drug_hist)
        formData.append('family_hist', patient.family_hist)
        formData.append('medical_hist', patient.medical_hist)
        formData.append('og_hist', patient.og_hist)
        formData.append('patient_name', patient.patient_name)
        formData.append('patient_phone', patient.patient_phone)
        formData.append('personal_hist', patient.personal_hist)
        formData.append('sex', patient.sex)
        formData.append('social_hist', patient.social_hist)
        formData.append('surgical_hist', patient.surgical_hist)


        for (let i = 0; i < value.length; i++) {
            var fileType = value[i].path[value[i].path - 1];
            formData.append(`photo[${i}]`, {
                name: value[i].name,
                type: `image/${fileType}`,
                uri: value[i].path

            });
        }
        console.log('form lab', formData);
        axios.post(`${BASE_URL}/patient/update_lab_image`, formData,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )

            .then(({ data }) => {
                console.log('dataresponse>>', data);
                if (data.status === "success") {
                    dispatch({
                        type: MULTIPLE_UPLOAD,
                        payload: data.data,
                    });

                    callback(labsuccess)
                } else {
                    callback(laberror);
                }

            })
            .then(error => console.log(error));

    }
}

export function fetchlabresult(callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/lab/get_labresult`,
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
                    type: FETCH_LABRESULT,
                    payload: data.data,
                });


            })
            .then(error => console.log(error));
    }
}

export function fetch_radiology() {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/lab/get_radiology`,
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
                    type: FETCH_RADIOLOGY,
                    payload: data.data,
                });


            })
            .then(error => console.log(error));
    }
}
export default function Labreducer(state = get_lab, action) {

    switch (action.type) {
        case FETCH_INVESTIGATION:
            return { ...state, investigations: action.payload };
        case FETCH_LABRESULT:
            return { ...state, lab_result: action.payload };
        case FETCH_RADIOLOGY:
            return { ...state, radiology_data: action.payload };
        case FETCH_LABRESULT_ATTACH:
            return { ...state, lab_result_attach: action.payload };
        default:
            return state
    }
}