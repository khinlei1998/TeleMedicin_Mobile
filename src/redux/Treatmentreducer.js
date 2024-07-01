import axios from "axios";
export const FETCH_PRESCRIPTION='FETCH_PRESCRIPTION'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const get_prescripiton = {
    prescriptions: [

    ]
}
export function fetchprescription( callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/patient/prescription`, DEFAULT_CONFIG)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_PRESCRIPTION,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log(error));
    }
}

export default function Treatmentreducer(state = get_prescripiton, action) {

    switch (action.type) {
        case FETCH_PRESCRIPTION:
            return { ...state, prescriptions: action.payload };
        default:
            return state
    }
}