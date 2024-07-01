import axios from "axios";
export const FETCH_TOWNSHIP = 'FETCH_TOWNSHIP'
export const KILLED_TOWN = 'KILLED_TOWN'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const get_state = {
    townships: [

    ]
}
export function fetchtownship(stateid, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/get_townships/${stateid}`, DEFAULT_CONFIG)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_TOWNSHIP,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log(error));
    }
}
export function killtown(props, callback = () => { }) {

    return (dispatch) => {
        dispatch({
            type: KILLED_TOWN,

        });
    }
}

export default function Townshipreducer(state = get_state, action) {

    switch (action.type) {
        case FETCH_TOWNSHIP:
            return { ...state, townships: action.payload };
        case KILLED_TOWN:
            return get_state;
        default:
            return state
    }
}