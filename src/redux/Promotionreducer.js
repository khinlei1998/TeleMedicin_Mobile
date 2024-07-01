
import axios from "axios";
export const FETCH_PROMOTION = 'FETCH_PROMOTION'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const promotions = {
    all_promotions: []
}
export function fetchpromotion(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/promotion`, {
            responseType: 'json',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await AsyncStorage.getItem("Auth_Key")
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_PROMOTION,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export default function promotionreducer(state = promotions, action) {

    switch (action.type) {

        case FETCH_PROMOTION:
            return { ...state, all_promotions: action.payload };
        default:
            return state
    }
}