import axios from "axios";
export const FETCH_FEEDBACK = 'FETCH_FEEDBACK'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, DEFAULT_CONFIG } from '../components/common';
const feedback = {
    feedbacklist: {}


}
export function fetch_feedback(values, callback = () => { }) {
    var feedbacksuccess = 'feedbacksuccess';
    var feedbackerror = 'feedbackerror';
    return async (dispatch) => {
        axios.post(`${BASE_URL}/patient/feedback`, values,
            {
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            }
        )
            .then(({ data }) => {
                if (data.status === "success") {
                    dispatch({
                        type: FETCH_FEEDBACK,
                        payload: data.data,
                    });

                    callback(feedbacksuccess);
                } else {
                    callback(feedbackerror);
                }
            })
            .then(error => console.log(error));
    }
}




export default function feedbackreducer(state = feedback, action) {

    switch (action.type) {
        case FETCH_FEEDBACK:
            return { ...state, feedbacklist: action.payload };
        default:
            return state
    }
}