export const CHANGE_LANGUAGE = CHANGE_LANGUAGE
export const FETCH_LANGUAGE = 'FETCH_LANGUAGE'
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
import axios from "axios";

const INITIAL_LANGUAGE = {
    languages: [
        {

        }
    ],
    all_languages: []
}


export function changelanguage(value) {

    return (dispatch) => {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: value
        });
    }
}

export function fetchlanguage(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/language`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_LANGUAGE,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export default function languagereducer(state = INITIAL_LANGUAGE, action) {

    switch (action.type) {
        case CHANGE_LANGUAGE:
            return { ...state, languages: action.payload };
        case FETCH_LANGUAGE:
            return { ...state, all_languages: action.payload };
        default:
            return state
    }
}