
import axios from "axios";
export const FETCH_DEPT='FETCH_DEPT'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const all_depts = {
    depts: [

    ]
}
export function fetchdept(values, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/department`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_DEPT,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error',error));
    }
}

export default function deptreducer(state = all_depts, action) {

    switch (action.type) {
        case FETCH_DEPT:
            return { ...state, depts: action.payload };
        default:
            return state
    }
}