import axios from "axios";
export const FETCH_GENDER='FETCH_GENDER'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const get_gender = {
    genders: [

    ]
}
export function fetchgender(props, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/gender`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_GENDER,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log(error));
    }
}

export default function Genderreducer(state = get_gender, action) {

    switch (action.type) {
        case FETCH_GENDER:
            return { ...state, genders: action.payload };
        default:
            return state
    }
}