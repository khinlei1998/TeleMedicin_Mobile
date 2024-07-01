import axios from "axios";
export const FETCH_STATE='FETCH_STATE'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const get_state = {
    states: [

    ]
}
export function fetchstate(props, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/state`,)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_STATE,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log(error));
    }
}

export default function Statereducer(state = get_state, action) {

    switch (action.type) {
        case FETCH_STATE:
            return { ...state, states: action.payload };
        default:
            return state
    }
}