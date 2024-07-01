import axios from "axios";
export const CONTENT_USER='CONTENT_USER'
import { BASE_URL } from '../components/common';
const get_content = {
    contents: [

    ]
}
export function  fetchcontent(props, callback = () => { }) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/content`)
            .then(({ data }) => {
                dispatch({
                    type: CONTENT_USER,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log(error));
    }
}

export default function contentreducer(state = get_content, action) {

    switch (action.type) {
        case CONTENT_USER:
            return { ...state, contents: action.payload };
        default:
            return state
    }
}