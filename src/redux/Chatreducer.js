
import axios from "axios";
export const FETCH_CHAT = 'FETCH_CHAT'
export const FETCH_CHAT_BY_DOCTOR = 'FETCH_CHAT_BY_DOCTOR'
export const CRETAE_CHAT = 'CRETAE_CHAT'
export const CRETAE_SUPPORT_CHAT = 'CRETAE_SUPPORT_CHAT'
export const FETCH_SUPPORT_CHAT = 'FETCH_SUPPORT_CHAT'
import { BASE_URL } from '../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
const chatlists = {
    chatlist: [

    ],
    chatlist_bydoctor: [],
    newchat: [],
    supportnewchat: [],
    chatlist_support: []
}
export function fetchchat(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/chat`,
            {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_CHAT,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function getchat_bydoctor(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/get_message_doctor/${values}`,
            {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_CHAT_BY_DOCTOR,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export function create_chat(values, callback = () => { }) {
    return async (dispatch) => {
        axios.post(`${BASE_URL}/patient/chat`, values,
            {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            })
            .then(({ data }) => {
                dispatch({
                    type: CRETAE_CHAT,
                    payload: data.data,
                });

                callback(data);
            })
            .then(error => console.log('error', error));
    }
}

export function create_support_chat(values, callback = () => { }) {
    return async (dispatch) => {
        axios.post(`${BASE_URL}/patient/support`, values,
            {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            })
            .then(({ data }) => {
                dispatch({
                    type: CRETAE_SUPPORT_CHAT,
                    payload: data.data,
                });

                callback(data);
            })
            .then(error => console.log('error', error));
    }
}
export function fetchsupport_chat(values, callback = () => { }) {
    return async (dispatch) => {
        axios.get(`${BASE_URL}/patient/support`,
            {
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": await AsyncStorage.getItem("Auth_Key")
                }
            })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_SUPPORT_CHAT,
                    payload: data.data,
                });

                callback();
            })
            .then(error => console.log('error', error));
    }
}

export default function chatreducer(state = chatlists, action) {

    switch (action.type) {
        case FETCH_CHAT:
            return { ...state, chatlist: action.payload };
        case FETCH_CHAT_BY_DOCTOR:
            return { ...state, chatlist_bydoctor: action.payload };
        case CRETAE_CHAT:
            return { ...state, newchat: action.payload };
        case CRETAE_SUPPORT_CHAT:
            return { ...state, supportnewchat: action.payload };
        case FETCH_SUPPORT_CHAT:
            return { ...state, chatlist_support: action.payload };
        default:
            return state
    }
}