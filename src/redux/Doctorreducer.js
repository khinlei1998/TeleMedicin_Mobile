import axios from 'axios';
export const FTECH_DOCTOR_BY_DEPT = 'FTECH_DOCTOR_BY_DEPT';
export const FETCH_DOCTOR = 'FETCH_DOCTOR';
export const FETCH_ALL_DOCTOR = 'FETCH_ALL_DOCTOR';
export const FETCH_DOC_STATE_TOWNSHIP = 'FETCH_DOC_STATE_TOWNSHIP';
export const FECTH_DOC_FOR_VIDEO = 'FECTH_DOC_FOR_VIDEO';
export const FETCH_AL_LNG = 'FETCH_AL_LNG';
export const FETCH_DOC_ID = 'FETCH_DOC_ID';
export const FETCH_LANGUAGE = 'FETCH_LANGUAGE';
export const FETCH_DOC_BY_STATE = 'FETCH_DOC_BY_STATE';
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const doctor = {
    doctor_by_dept: [],
    doctor: {},
    all_doctor: [],
    doc_by_state_town: [],
    doctor_id: '',
    alllng: [],
    doc_id: {},
    languages: [],
    doc_by_state: []
};
export function fetchdoector_by_dept(values, callback = () => { }) {
    return dispatch => {
        axios
            .get(`${BASE_URL}/patient/doctors_by_department/${values}`)
            .then(({ data }) => {
                dispatch({
                    type: FTECH_DOCTOR_BY_DEPT,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    };
}
export function fetchdoctor_for_video(values, callback = () => { }) {
    return dispatch => {
        dispatch({
            type: FECTH_DOC_FOR_VIDEO,
            payload: values,
        });

        callback();
    };
}

export function fetchalldoctor(values, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/doctor/doctorfilter`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_ALL_DOCTOR,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('yy', error));
    };
}




export function fetchdoc_language(values, callback = () => { }) {
    return dispatch => {
        axios
            .post(`${BASE_URL}/language`, values)

            .then(({ data }) => {
                dispatch({
                    type: FETCH_AL_LNG,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('yy', error));
    };
}

export function fetchdoc_id(values, callback = () => { }) {
    return dispatch => {
        axios
            .get(`${BASE_URL}/getdoc_id/${values}`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_DOC_ID,
                    payload: data,
                });

                callback();
            })
            .then(error => console.log('yy', error));
    };
}

// export function get_state_townshup_dept(values, callback = () => { }) {
//     return dispatch => {
//         axios
//             .get(
//                 `${BASE_URL}/doctor_search/${values.state}/${values.township}/${values.speciality}`,
//                 DEFAULT_CONFIG,
//             )

//             .then(({ data }) => {
//                 dispatch({
//                     type: FETCH_DOC_STATE_TOWNSHIP,
//                     payload: data.data,
//                 });

//                 callback();
//             })
//             .then(error => console.log('yy', error));
//     };
// }

export function get_all_languages(values, callback = () => { }) {
    return dispatch => {
        axios
            .get(
                `${BASE_URL}/get_all_languages`,
                DEFAULT_CONFIG,
            )

            .then(({ data }) => {
                dispatch({
                    type: FETCH_LANGUAGE,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('yy', error));
    };
}

// export function get_doctor_by_state(values, callback = () => { }) {
//     return dispatch => {
//         axios
//             .get(
//                 `${BASE_URL}/get_doc_By_state/${values}`,
//                 DEFAULT_CONFIG,
//             )

//             .then(({ data }) => {
//                 dispatch({
//                     type: FETCH_DOC_BY_STATE,
//                     payload: data.data,
//                 });

//                 callback();
//             })
//             .then(error => console.log('yy', error));
//     };
// }

export function get_doctor_by_state_town(values, callback = () => { }) {
    return dispatch => {
        axios
            .post(
                `${BASE_URL}/get_doc_By_state_town`, values,
                DEFAULT_CONFIG,
            )

            .then(({ data }) => {
                dispatch({
                    type: FETCH_DOC_BY_STATE,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('yy', error));
    };
}
// export function get_doctor_by_dept(values, callback = () => { }) {
//     console.log('values', values)
//     return dispatch => {
//         axios
//             .get(
//                 `${BASE_URL}/get_doc_By_dept/${values}`,
//                 DEFAULT_CONFIG,
//             )

//             .then(({ data }) => {
//                 dispatch({
//                     type: FETCH_DOC_BY_STATE,
//                     payload: data.data,
//                 });

//                 callback();
//             })
//             .then(error => console.log('yy', error));
//     };
// }
// export function get_doctor_by_lng(values, callback = () => { }) {
//     return dispatch => {
//         axios
//             .get(
//                 `${BASE_URL}/get_doc_By_lng`,
//                 DEFAULT_CONFIG,
//             )

//             .then(({ data }) => {
//                 console.log('selec', data)
//                 dispatch({
//                     type: FETCH_DOC_BY_STATE,
//                     payload: data.data,
//                 });

//                 callback();
//             })
//             .then(error => console.log('yy', error));
//     };
// }

export default function doctorreducer(state = doctor, action) {
    switch (action.type) {
        case FTECH_DOCTOR_BY_DEPT:
            return { ...state, doctor_by_dept: action.payload };
        case FETCH_DOCTOR:
            return { ...state, doctor: action.payload };
        case FETCH_ALL_DOCTOR:
            return { ...state, all_doctor: action.payload };
        case FETCH_DOC_STATE_TOWNSHIP:
            return { ...state, doc_by_state_town: action.payload };
        case FECTH_DOC_FOR_VIDEO:
            return { ...state, doctor_id: action.payload };
        case FETCH_AL_LNG:
            return { ...state, alllng: action.payload };
        case FETCH_DOC_ID:
            return { ...state, doc_id: action.payload };
        case FETCH_LANGUAGE:
            return { ...state, languages: action.payload };
        case FETCH_DOC_BY_STATE:
            return { ...state, doc_by_state: action.payload };
        default:
            return state;
    }
}
