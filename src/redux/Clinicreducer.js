import axios from "axios";
export const FETCH_CLINIC_BY_STATE_TOWNSHIP = 'FETCH_CLINIC_BY_STATE_TOWNSHIP'
export const FETCH_DOCTOR_BY_CLINIC = 'FETCH_DOCTOR_BY_CLINIC'

import { BASE_URL } from '../components/common';
const clinic = {
    clinic_by_state: [],
    alldocotor_by_state: []


}
export function fetchclinic_by_state(values, callback = () => { }) {
    return (dispatch) => {
        axios.post(`${BASE_URL}/clinic_search`, values)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_CLINIC_BY_STATE_TOWNSHIP,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function fetchdoctor_by_clinic(id, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/doctor_by_clinic/${id}`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_DOCTOR_BY_CLINIC,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}




export default function clinicreducer(state = clinic, action) {

    switch (action.type) {
        case FETCH_CLINIC_BY_STATE_TOWNSHIP:
            return { ...state, clinic_by_state: action.payload };
        case FETCH_DOCTOR_BY_CLINIC:
            return { ...state, alldocotor_by_state: action.payload };

        default:
            return state
    }
}